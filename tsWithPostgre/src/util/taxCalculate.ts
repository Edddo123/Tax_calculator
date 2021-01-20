

export const incomeCalculation = (residence: string, employment:string, benefits: 'Yes' | 'No', totalIncome:number, taxType:string) => {
    let grossIncome:number = +((totalIncome / 0.784).toFixed(2))
    let pensionTax:number = +((grossIncome * 0.02).toFixed(2))
    const incomeTax:number = +(((grossIncome - pensionTax) * 0.2).toFixed(2))
    return {grossIncome, incomeTax, pensionTax, taxType}
};

export const VATCalculation = (Sales:number) => {
    if(Sales<=100000) {
       return  {response:"you have no obligation to pay VAT"}
    }
    else {
        return {response:Sales*0.18}
    }

}