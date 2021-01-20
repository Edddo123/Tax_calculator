"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const personButton = document.getElementById("personButton");
const personTaxes = document.getElementById("personTaxes");
const corpButton = document.getElementById("corporationButton");
const corpTaxes = document.getElementById("corpTaxes");
const incomeButton = document.getElementById("incomeButton");
const personIncome = document.getElementById("personIncome");
const VATButton = document.getElementById("VATButton");
const personVAT = document.getElementById("personVAT");
const corpVATButton = document.getElementById("corpVATButton");
const corpVAT = document.getElementById("corpVAT");
const incomeSubmit = document.getElementById("incomeSubmit");
const personVATSubmit = document.getElementById('personVATSubmit');
const corpVATSubmit = document.getElementById('corpVATSubmit');
const response = document.getElementById("response");
personButton.addEventListener("click", clickPerson);
corpButton.addEventListener("click", clickCorp);
incomeButton.addEventListener("click", incomePerson);
VATButton.addEventListener("click", VATPerson);
corpVATButton.addEventListener("click", VATCorp);
incomeSubmit.addEventListener("click", getIncome);
personVATSubmit.addEventListener("click", getPersonVAT);
corpVATSubmit.addEventListener("click", getCorpVAT);
function clickPerson(e) {
    e.preventDefault();
    personTaxes.style.display = "inline-block";
    corpTaxes.style.display = "none";
    corpVAT.style.display = "none";
}
function clickCorp(e) {
    e.preventDefault();
    corpTaxes.style.display = "inline-block";
    personTaxes.style.display = "none";
    personIncome.style.display = "none";
    personVAT.style.display = "none";
    response.innerHTML = "";
}
function incomePerson(e) {
    e.preventDefault();
    personIncome.style.display = "inline-block";
    personVAT.style.display = "none";
}
function VATPerson(e) {
    e.preventDefault();
    personVAT.style.display = "inline-block";
    personIncome.style.display = "none";
    response.innerHTML = "";
}
function VATCorp(e) {
    e.preventDefault();
    corpVAT.style.display = "inline-block";
    response.innerHTML = "";
}
function getIncome(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const residence = document.getElementById("residence");
        const employment = document.getElementById("employment");
        const benefits = document.getElementById("benefits");
        const totalIncome = document.getElementById("totalIncome");
        try {
            const result = yield fetch("http://localhost:3001/postIncomeCalculator", {
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
            const data = yield result.json();
            response.innerHTML = "";
            response.innerHTML = `
    <p>Your Gross income is ${data.response.grossIncome}</p>
    <p>Your income tax is ${data.response.incomeTax}</p>
    <p>Your pension tax is ${data.response.pensionTax}</p>
    <p>Tax type is ${data.response.taxType}</p>
    `;
        }
        catch (err) {
            console.log("there is sth wrong");
        }
    });
}
function getPersonVAT(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const VATSales = document.getElementById("VATSales");
        const result = yield fetch("http://localhost:3001/PersonVAT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sales: VATSales.value
            }),
        });
        const data = yield result.json();
        response.innerHTML = "";
        response.innerHTML = `<p>${data.response.response}</p>`;
        console.log(data);
    });
}
function getCorpVAT(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const VATSales = document.getElementById("VATSales");
        const result = yield fetch("http://localhost:3001/CorpVAT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sales: VATSales.value
            }),
        });
        const data = yield result.json();
        response.innerHTML = "";
        response.innerHTML = `<p>${data.response.response}</p>`;
    });
}
