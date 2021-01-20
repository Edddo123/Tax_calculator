

const personButton = document.getElementById(
  "personButton"
)! as HTMLButtonElement;
const personTaxes = document.getElementById("personTaxes")! as HTMLDivElement;

const corpButton = document.getElementById(
  "corporationButton"
)! as HTMLButtonElement;
const corpTaxes = document.getElementById("corpTaxes")! as HTMLDivElement;

const incomeButton = document.getElementById(
  "incomeButton"
)! as HTMLButtonElement;
const personIncome = document.getElementById("personIncome")! as HTMLDivElement;

const VATButton = document.getElementById("VATButton")! as HTMLButtonElement;
const personVAT = document.getElementById("personVAT")! as HTMLDivElement;

const corpVATButton = document.getElementById(
  "corpVATButton"
)! as HTMLButtonElement;
const corpVAT = document.getElementById("corpVAT")! as HTMLDivElement;

const incomeSubmit = document.getElementById(
  "incomeSubmit"
)! as HTMLButtonElement;
const personVATSubmit = document.getElementById('personVATSubmit') as HTMLButtonElement
const corpVATSubmit = document.getElementById('corpVATSubmit') as HTMLButtonElement

const response = document.getElementById("response") as HTMLDivElement;


personButton.addEventListener("click", clickPerson);
corpButton.addEventListener("click", clickCorp);
incomeButton.addEventListener("click", incomePerson);
VATButton.addEventListener("click", VATPerson);
corpVATButton.addEventListener("click", VATCorp);

incomeSubmit.addEventListener("click", getIncome);
personVATSubmit.addEventListener("click", getPersonVAT);
corpVATSubmit.addEventListener("click", getCorpVAT)

function clickPerson(e: Event) {
  e.preventDefault();
  personTaxes.style.display = "inline-block";
  corpTaxes.style.display = "none";
  corpVAT.style.display = "none";
}

function clickCorp(e: Event) {
  e.preventDefault();
  corpTaxes.style.display = "inline-block";
  personTaxes.style.display = "none";
  personIncome.style.display = "none";
  personVAT.style.display = "none";
  response.innerHTML = "";
}

function incomePerson(e: Event) {
  e.preventDefault();
  personIncome.style.display = "inline-block";
  personVAT.style.display = "none";
}

function VATPerson(e: Event) {
  e.preventDefault();
  personVAT.style.display = "inline-block";
  personIncome.style.display = "none";
  response.innerHTML = "";
}

function VATCorp(e: Event) {
  e.preventDefault();
  corpVAT.style.display = "inline-block";
  response.innerHTML = "";
}

async function getIncome(e: Event) {
  e.preventDefault();
  const residence = document.getElementById("residence") as HTMLSelectElement;
  const employment = document.getElementById("employment") as HTMLSelectElement;
  const benefits = document.getElementById("benefits") as HTMLSelectElement;
  const totalIncome = document.getElementById(
    "totalIncome"
  ) as HTMLInputElement;

  try {
    const result = await fetch("http://localhost:3001/postIncomeCalculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        residence: residence.value,
        employment: employment.value,
        benefits: benefits.value,
        totalIncome: totalIncome.value,
      }),
    });
    const data = await result.json();
    response.innerHTML = "";
    response.innerHTML = `
    <p>Your Gross income is ${data.response.grossIncome}</p>
    <p>Your income tax is ${data.response.incomeTax}</p>
    <p>Your pension tax is ${data.response.pensionTax}</p>
    <p>Tax type is ${data.response.taxType}</p>
    `;
  } catch (err) {
    console.log("there is sth wrong");
  }
}

async function getPersonVAT(e:Event) {
    e.preventDefault()
    const VATSales = document.getElementById("VATSales") as HTMLInputElement
    const result = await fetch("http://localhost:3001/PersonVAT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sales : VATSales.value
      }),
    });
    const data = await result.json();
    response.innerHTML = "";
    response.innerHTML = `<p>${data.response.response}</p>`
    console.log(data)
}

async function getCorpVAT(e:Event) {
    e.preventDefault()
    const VATSales = document.getElementById("VATSales") as HTMLInputElement
    const result = await fetch("http://localhost:3001/CorpVAT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sales : VATSales.value
      }),
    });
    const data = await result.json();
    response.innerHTML = "";
    response.innerHTML = `<p>${data.response.response}</p>`
}