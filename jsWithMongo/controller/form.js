
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

exports.postRecordsVAT = async (req, res, next) => {
    const taxType = req.body.taxType
    const totalVAT = +req.body.totalVAT
    const newRecord = new Record({
        Tax_Type: taxType,
        Tax_Amount: { totalVAT },
        user: req.userId
    })
    try {
        await newRecord.save()

        res.redirect('/records')

    } catch (err) {
        const error = new Error(err);
        return next(error);
    }

}

exports.postRecordsInc = async (req, res, next) => {
    const { taxType, pensionTax, incomeTax, grossIncome } = req.body
    const newRecord = new Record({
        Tax_Type: taxType,
        Tax_Amount: { pensionTax, incomeTax, grossIncome },
        user: req.userId
    })
    try {
        await newRecord.save()

        res.status(200).json({ message: 'record posted' })

    } catch (err) {
        const error = new Error(err);
        return next(error);
    }

}

exports.getRecords = async (req, res, next) => {
  
    let page = +req.query.page
    let perPage = 2
    try {
        const count = await Record.find({ user: req.userId }).countDocuments()
        const data = await Record.find({ user: req.userId }).skip((page - 1) * perPage).limit(perPage)
        let newData = data.map(x => {
            let convertedDate = new Date(x.createdAt)
            let formattedDate = `${convertedDate.getDate()}/${convertedDate.getMonth()}/${convertedDate.getFullYear()}-${convertedDate.getHours()}:${('0' + convertedDate.getMinutes()).slice(-2)}`
            return { ...x, createdAt: formattedDate }
        })
        
        if (!page) {
            console.log(newData)
            res.render('records', {     
                data: newData,
                myTok: saveTok
            })
        } else {
            
            res.status(200).json({ data: newData, totalItems: count, perPage })
        }

    } catch (err) {
        console.log(err)
        // const error = new Error(err);
        // return next(error);
    }
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

exports.postSignup = async (req, res, next) => {
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
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email,
            name,
            password: hashedPassword
        })
        await user.save()
        res.redirect('/getLogin')

    } catch (err) {
        const error = new Error(err);
        return next(error);
    }
}


exports.postLogin = async (req, res, next) => {

    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error('No user found')
        }
        const isSame = await bcrypt.compare(password, user.password)
        if (!isSame) {
            throw new Error('No user found')
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString(),
        }, 'secret', { expiresIn: '30min' })

        res.status(200).json({ token: token, userId: user._id.toString() })
        saveTok = token

    } catch (err) {
        console.log(err)
    }
}

exports.postLogout = (req, res, next) => {
    saveTok = '';
    res.redirect('/getLogin')
}


exports.getPosts = async (req, res, next) => {
    let page = +req.query.page
    let perPage = 7
    try {
        const count = await Post.find().countDocuments()
        const data = await Post.find().skip((page - 1) * perPage).limit(perPage)
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
            res.status(200).json({ data: newData, totalItems: count, perPage })
        }
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }
}


exports.addPost = async (req, res, next) => {
    try {
        const content = req.body.content
        const user = await User.findById(req.userId)
        const post = new Post({
            creator: user.name,
            content: content,
            userId: req.userId
        })
        const result = await post.save()

        let convertedDate = new Date(result.createdAt)
        let formattedDate = `${convertedDate.getDate()}/${convertedDate.getMonth()}/${convertedDate.getFullYear()}-${convertedDate.getHours()}:${('0' + convertedDate.getMinutes()).slice(-2)}`
        let newResult = { ...result, createdAt: formattedDate }

        sock.getIO().emit('message', { post: newResult })

        res.status(200).json({ message: 'Post added Successfully' })


    } catch (err) {
        const error = new Error(err);
        return next(error);
    }



}


exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId

        const post = await Post.findById(postId)

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
        await Post.findByIdAndRemove(postId)

        sock.getIO().emit('deleteMessage', { deletedPost: post })

        res.status(200).json({ message: 'Product deleted' })

    } catch (err) {
        const error = new Error(err);
        return next(error);
    }
}

exports.deleteRecord = async (req, res, next) => {
    let recordData
    const recordId = req.params.recordId
    try {
        const record = await Record.findById(recordId)
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
        await Record.findByIdAndRemove(recordId)

        res.status(200).json({ message: 'Product deleted' })
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }
}

