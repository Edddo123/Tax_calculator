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
const personVATSubmit = document.getElementById(
  "personVATSubmit"
) as HTMLButtonElement;
const corpVATSubmit = document.getElementById(
  "corpVATSubmit"
) as HTMLButtonElement;

const response = document.getElementById("response") as HTMLDivElement;

personButton.addEventListener("click", clickPerson);
corpButton.addEventListener("click", clickCorp);
incomeButton.addEventListener("click", incomePerson);
VATButton.addEventListener("click", VATPerson);
corpVATButton.addEventListener("click", VATCorp);

incomeSubmit.addEventListener("click", getIncome);
personVATSubmit.addEventListener("click", getPersonVAT);
corpVATSubmit.addEventListener("click", getCorpVAT);

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
  try {
    const residence = document.getElementById("residence") as HTMLSelectElement;
    const employment = document.getElementById(
      "employment"
    ) as HTMLSelectElement;
    const benefits = document.getElementById("benefits") as HTMLSelectElement;
    const totalIncome = document.getElementById(
      "totalIncome"
    ) as HTMLInputElement;

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
    <input
    type="Submit"
    name="sbmt"
    value="Add To Records"
    id="incomeRecord"
  />
    `;
    const incomeRecord = document.getElementById(
      "incomeRecord"
    )! as HTMLButtonElement;
    incomeRecord.addEventListener("click", addIncome);
    async function addIncome(e: Event) {
      e.preventDefault();
      const resultRecord = await fetch("http://localhost:3001/incomeRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ taxableIncome: data.response }),
      });
      await resultRecord.json();
      window.location.replace("http://localhost:3001/records");
    }
  } catch (err) {
    console.log(err, "income failed");
  }
}

async function getPersonVAT(e: Event) {
  e.preventDefault();
  const taxType = "VAT";
  const VATSales = document.getElementById("VATSales") as HTMLInputElement;
  try {
    const result = await fetch("http://localhost:3001/personVAT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sales: VATSales.value,
      }),
    });
    const data = await result.json();
    const VATpayable = data.response.response || data.response.message;
    response.innerHTML = "";
    response.innerHTML = `<p>${VATpayable}</p>
    <input
    type="Submit"
    name="sbmt"
    value="Add To Records"
    id="personVATRecord"
  />
    `;

    const personVATRecord = document.getElementById(
      "personVATRecord"
    )! as HTMLButtonElement;
    personVATRecord.addEventListener("click", addPersVAT);
    async function addPersVAT(e: Event) {
      e.preventDefault();
      const resultRecord = await fetch(
        "http://localhost:3001/personVATRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ salesVAT: VATpayable, taxType }),
        }
      );
      const dataRecord = await resultRecord.json();
      window.location.replace("http://localhost:3001/records");
    }
  } catch (err) {
    console.log(err, "Person VAT failed");
  }
}

async function getCorpVAT(e: Event) {
  e.preventDefault();
  try {
    const taxType = "corpVAT";
    const corpVATSales = document.getElementById(
      "corpVATSales"
    ) as HTMLInputElement;
    const result = await fetch("http://localhost:3001/corpVAT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        sales: corpVATSales.value,
      }),
    });

    const data = await result.json();
    const VATpayable = data.response.response || data.response.message;
    response.innerHTML = "";
    response.innerHTML = `<p>Your VAT payable: ${VATpayable}</p>
    <input
    type="Submit"
    name="sbmt"
    value="Add To Records"
    id="corpVATRecord"
  />
    `;

    const corpVATRecord = document.getElementById(
      "corpVATRecord"
    )! as HTMLButtonElement;
    corpVATRecord.addEventListener("click", addCorpVAT);

    async function addCorpVAT(e: Event) {
      e.preventDefault();
      const resultRecord = await fetch("http://localhost:3001/corpVATRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ salesVAT: VATpayable, taxType }),
      });
      const dataRecord = await resultRecord.json();
      window.location.replace("http://localhost:3001/records");
    }
  } catch (err) {
    console.log(err, "corpVAT failed");
  }
}
