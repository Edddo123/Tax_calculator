exports.getForm = (req, res, next) => {
    res.render('index')
}

exports.persnInc = (req, res, next) =>{
    const residence = req.body.dropDown
    const employmentStatus = req.body.statusRadio
    const totIncome = +req.body.totIncome
    const benefits = req.body.benefits
    let grossIncome = totIncome/0.784
    let pensionTax = grossIncome*0.02
    const incomeTax = (grossIncome - pensionTax) * 0.2

    res.status(200).json({pensionTax, incomeTax, grossIncome})
}