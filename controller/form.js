
const Record = require('../models/record')
const User = require('../models/user')
const Post = require('../models/post')
const { validationResult } = require('express-validator');


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sock = require('../socket')

let saveTok
exports.getMain = (req, res, next) => {
    res.render('main.ejs', {
        myTok: saveTok
    })
}

exports.getForm = (req, res, next) => {
    res.render('index', {
        myTok: saveTok
    })
}

exports.persnInc = (req, res, next) => {

    const residence = req.body.dropDown
    const employmentStatus = req.body.statusRadio
    const totIncome = +req.body.totIncome
    const benefits = req.body.benefits
    let grossIncome = (totIncome / 0.784).toFixed(2)
    let pensionTax = (grossIncome * 0.02).toFixed(2)
    const incomeTax = ((grossIncome - pensionTax) * 0.2).toFixed(2)
    const taxType = req.body.taxType

    res.status(200).json({ pensionTax, incomeTax, grossIncome, taxType })
}

exports.totalVAT = (req, res, next) => {
    const totalSales = +req.body.totalSales
    const taxType = req.body.taxType

    if (totalSales <= 100000) {
        res.status(200).json({ messageVAT: 'No VAT needs to be paid', taxType })
    }
    const totalVAT = totalSales * 0.18;
    res.status(200).json({ totalVAT, taxType })
}

exports.postRecordsVAT = (req, res, next) => {
    const taxType = req.body.taxType
    const totalVAT = +req.body.totalVAT
    const newRecord = new Record({
        Tax_Type: taxType,
        Tax_Amount: { totalVAT },
        user: req.userId
    })
    newRecord.save()
        .then(result => {
            res.redirect('/records')
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        })

}

exports.postRecordsInc = (req, res, next) => {
    // const {taxType, pensionTax} = req.body descturcturing gamoiyene
    const taxType = req.body.taxType
    const pensionTax = +req.body.pensionTax
    const incomeTax = +req.body.incomeTax
    const grossIncome = +req.body.grossIncome
    const newRecord = new Record({
        Tax_Type: taxType,
        Tax_Amount: { pensionTax, incomeTax, grossIncome },
        user: req.userId
    })
    newRecord.save()
        .then(result => {
            res.status(200).json({ message: 'record posted' })
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        })

}

exports.getRecords = (req, res, next) => {
    let page = +req.query.page
    let perPage = 2
    let totalItems
    return Record.find({ user: req.userId }).countDocuments()
        .then(count => {
            totalItems = count
            return Record.find({ user: req.userId }).skip((page - 1) * perPage).limit(perPage)
        })
        .then(data => {

            let newData = data.map(x => {
                let convertedDate = new Date(x.createdAt)
                let formattedDate = `${convertedDate.getDate()}/${convertedDate.getMonth()}/${convertedDate.getFullYear()}-${convertedDate.getHours()}:${('0' + convertedDate.getMinutes()).slice(-2)}` //slice negative iwevs bolodan anu -2 aris bolodan meore wevri da tu marto start maq mashin end ad array lengths aigebs
                return { ...x, createdAt: formattedDate }
            }) //es mibrunebs objectebis arrays sadac shecvlili monacemi tavidanvea da _doc shi aris dzveli monacemebi
            // ${convertedDate.getMinutes()<10?'0':''}${convertedDate.getMinutes()} anu tu 10ze naklebia 0s wers da mere minutes umatebs da gamodis

            if (!page) {
                res.render('records', {
                    data: newData,
                    myTok: saveTok
                })
            } else {


                res.status(200).json({ data: newData, totalItems, perPage })
            }
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        })
}

exports.getAuth = (req, res, next) => {

    res.render('auth.ejs', {

        myTok: saveTok,
        oldInput: {
            email: '',
            password: '',
            name: '',

        },
        errorMessage: undefined
    })
}

exports.getLogin = (req, res, next) => {

    res.render('login', {
        myTok: saveTok
    })
}

exports.postSignup = (req, res, next) => {
    const name = req.body.username
    const email = req.body.email
    const password = req.body.password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth', {
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password,
                name: name,

            },
            myTok: saveTok
        });
    }
    return bcrypt.hash(password, 10)
        .then(hashedPassword => {
            const user = new User({
                email,
                name,
                password: hashedPassword
            })
            user.save()
                .then(user => {
                    res.redirect('/getLogin')
                })
        })


        .catch(err => {
            const error = new Error(err);
            return next(error);
        })
}


exports.postLogin = (req, res, next) => {

    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(user => {

            if (!user) {
                throw new Error('No user found')
            }
            bcrypt.compare(password, user.password)
                .then(isSame => {
                    if (!isSame) {
                        throw new Error('No user found')
                    }
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id.toString(),
                    }, 'secret', { expiresIn: '30min' })

                    res.status(200).json({ token: token, userId: user._id.toString() })
                    saveTok = token
                })
                .catch(err => console.log(err))
        })
}

exports.postLogout = (req, res, next) => {
    saveTok = '';
    res.redirect('/getLogin')
}


exports.getPosts = (req, res, next) => {
    let page = +req.query.page
    let perPage = 7
    let totalItems

    Post.find().countDocuments()
        .then(count => {
            totalItems = count
            return Post.find().skip((page - 1) * perPage).limit(perPage)
        })
        .then(data => {
            let newData = data.map(x => {
                let convertedDate = new Date(x.createdAt)
                let formattedDate = `${convertedDate.getDate()}/${convertedDate.getMonth()}/${convertedDate.getFullYear()}-${convertedDate.getHours()}:${('0' + convertedDate.getMinutes()).slice(-2)}` //slice negative iwevs bolodan anu -2 aris bolodan meore wevri da tu marto start maq mashin end ad array lengths aigebs
                return { ...x, createdAt: formattedDate }


            })
            if (!page) {
                res.render('feed', {
                    data: newData,
                    myTok: saveTok
                })
            } else {


                res.status(200).json({ data: newData, totalItems, perPage })
            }

        })
}


exports.addPost = (req, res, next) => {
    let ourUser
    const content = req.body.content
    User.findById(req.userId)
        .then(user => {
            ourUser = user
            const post = new Post({
                creator: user.name,
                content: content,
                userId: req.userId
            })
            post.save()
                .then(result => {
                    let convertedDate = new Date(result.createdAt)
                    let formattedDate = `${convertedDate.getDate()}/${convertedDate.getMonth()}/${convertedDate.getFullYear()}-${convertedDate.getHours()}:${('0' + convertedDate.getMinutes()).slice(-2)}`

                    let newResult = { ...result, createdAt: formattedDate }
                  
                    sock.getIO().emit('message', { post: newResult })
                    
                    
                    res.status(200).json({ message: 'Post added Successfully' })
                })


        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        })



}


exports.deletePost = (req, res, next) => {
    let postData
    const postId = req.params.postId

    Post.findById(postId)
        .then(post => {
            postData = post
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            if (post.userId.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            return Post.findByIdAndRemove(postId)

        })
        // console.log(req.userId)
        .then(result => {
            sock.getIO().emit('deleteMessage', { deletedPost: postData })
        
            res.status(200).json({ message: 'Product deleted' })
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        })
}

exports.deleteRecord = (req, res, next) => {
    let recordData
    const recordId = req.params.recordId

    Record.findById(recordId)
        .then(record => {
            recordData = record
            if (!record) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            if (record.user.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            return Record.findByIdAndRemove(recordId)

        })
        // console.log(req.userId)
        .then(result => {

            console.log('deleted product')
            res.status(200).json({ message: 'Product deleted' })
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        })
}

