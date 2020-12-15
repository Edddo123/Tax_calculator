const Record = require('../models/record')

exports.getForm = (req, res, next) => {
    res.render('index')
}

exports.persnInc = (req, res, next) => {
    
    const residence = req.body.dropDown
    const employmentStatus = req.body.statusRadio
    const totIncome = +req.body.totIncome
    const benefits = req.body.benefits
    let grossIncome = totIncome/0.784
    let pensionTax = grossIncome * 0.02
    const incomeTax = (grossIncome - pensionTax) * 0.2
    const taxType = req.body.taxType

    res.status(200).json({pensionTax, incomeTax, grossIncome, taxType})
}

exports.totalVAT = (req, res, next) => {
    const totalSales = +req.body.totalSales
    const taxType = req.body.taxType
    
    if(totalSales <= 100000) {
        res.status(200).json({messageVAT : 'No VAT needs to be paid', taxType})
    }
    const totalVAT = totalSales * 0.18;
    
    res.status(200).json({totalVAT, taxType})
}

exports.postRecordsVAT = (req, res, next) =>{
   const taxType = req.body.taxType
   const totalVAT = +req.body.VATAmount
    const newRecord = new Record({
        Tax_Type: taxType,
        Tax_Amount : {totalVAT},
        user : {
            name : 'Edward'
        }
    })
    newRecord.save()
    .then(result=>{
        res.redirect('/records')
    })
    .catch(err=>console.log(err))

}

exports.postRecordsInc = (req, res, next) =>{
    const taxType = req.body.taxType
    const pensionTax = +req.body.pensionTax
    const incomeTax = +req.body.incomeTax
    const grossIncome = +req.body.grossIncome
     const newRecord = new Record({
         Tax_Type: taxType,
         Tax_Amount : {pensionTax, incomeTax, grossIncome},
         user : {
             name : 'Edward'
         }
     })
     newRecord.save()
     .then(result=>{
         res.redirect('/records')
     })
     .catch(err=>console.log(err))
 
 }

 exports.getRecords = (req, res, next) => {
 return   Record.find()
    .then(data=> {
     let newData =   data.map(x =>{
            let convertedDate = new Date(x.createdAt)
            let formattedDate = `${convertedDate.getDate()}/${convertedDate.getMonth()}/${convertedDate.getFullYear()}-${convertedDate.getHours()}:${convertedDate.getMinutes()}`
            return {...x, createdAt : formattedDate}
            // return{...x, user: {name : 'Michael'}}
        }) //es mibrunebs objectebis arrays sadac shecvlili monacemi tavidanvea da _doc shi aris dzveli monacemebi
        
        
        res.render('records', {
            data : newData,
        })
    })
    .catch(err=>console.log(err))
 }

//  <!-- <% for(obj in data.Tax_Amount) { %>
//     <ul>
//         <li>obj : data.Tax_Amount[obj]</li>
//     </ul>


// <%}%> -->