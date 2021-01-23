interface incomeFunction {
  (
    residence: string,
    employment: string,
    benefits: "Yes" | "No",
    totalIncome: number,
    taxType: string
  ): {
    grossIncome: number;
    incomeTax: number;
    pensionTax: number;
    taxType: string;
  };
}

interface VATFunction {
  (Sales: number): { response: number } | { message: string };
}

export const incomeCalculation: incomeFunction = (
  residence,
  employment,
  benefits,
  totalIncome,
  taxType
) => {
  let grossIncome = +(totalIncome / 0.784).toFixed(2);
  let pensionTax = +(grossIncome * 0.02).toFixed(2);
  const incomeTax = +((grossIncome - pensionTax) * 0.2).toFixed(2);
  return { grossIncome, incomeTax, pensionTax, taxType };
};

export const VATCalculation: VATFunction = (Sales) => {
  const VATpayable: number = +(Sales * 0.018).toFixed(2);
  if (Sales <= 100000) {
    return { message: "you have no obligation to pay VAT" };
  } else {
    return { response: VATpayable };
  }
};
