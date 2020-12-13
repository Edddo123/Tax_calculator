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

    res.status(200).json({pensionTax, incomeTax, grossIncome})
}

exports.totalVAT = (req, res, next) => {
    const totalSales = +req.body.totalSales
    
    if(totalSales <= 100000) {
        res.status(200).json({messageVAT : 'No VAT needs to be paid'})
    }
    const totalVAT = totalSales * 0.18;
    
    res.status(200).json({totalVAT})
}