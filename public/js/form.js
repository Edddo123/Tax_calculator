const personBtn = document.getElementById('personBtn')
const corpBtn = document.getElementById('corpBtn')
const person = document.getElementById('person')
const corporation = document.getElementById('corporation')
const personIncome = document.getElementById('personIncome')
const personIncBtn = document.getElementById('personIncBtn')
const personVATBtn = document.getElementById('personVATBtn')
const corpVATBtn = document.getElementById('corpVATBtn')
const mainChoice = document.getElementById('choice')
const bothVAT = document.getElementById('bothVAT')
const logoutBtn = document.getElementById('Logout')



let finalRes
let finalVAT

const submitVAT = document.getElementById('VATform')
const submitForm = document.getElementById('form')


logoutBtn.addEventListener('click', logMeOut)
function logMeOut() {
    localStorage.removeItem("jwt");
}

submitForm.addEventListener('submit', (e) => {
    let taxType = "Income Tax"
    let dropDown = document.getElementById('residence').value
    let statusRadio
    let benefits
    if (document.getElementById('employed').checked) {
        statusRadio = document.getElementById('employed').value
    } else if (document.getElementById('self-employed').checked) {
        statusRadio = document.getElementById('self-employed').value
    }
    else statusRadio = document.getElementById('other').value
    let totIncome = document.getElementById('totIncome').value //its string

    if (document.getElementById('yes').checked) {
        benefits = document.getElementById('yes').value
    } else {
        benefits = document.getElementById('no').value
    }
    e.stopPropagation()
    e.preventDefault()
    fetch('http://localhost:3000/persnInc', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        },
        //its same as dropDown : dropDown
        body: JSON.stringify({
            dropDown,
            statusRadio,
            totIncome,
            benefits,
            taxType
        })
    })
        .then(result => result.json())
        .then(data => {
            let newDiv = document.createElement('div')
            newDiv.setAttribute('id', 'finalResult')
            newDiv.innerHTML = `
        <p>Your gross income is ${data.grossIncome}</p>
        <p>Your income tax is ${data.incomeTax}</p>
        <p>Your Pension fee is ${data.pensionTax}</p>
        `;
            mainChoice.appendChild(newDiv)
           





            finalRes = document.getElementById('finalResult');
            personIncome.style.display = "none"
            document.getElementById('recordIncForm').style.display = 'block'

            document.getElementById('tryForm').addEventListener('submit', (e) => {
                e.preventDefault()
                document.getElementById('taxType').setAttribute('value', data.taxType)
                document.getElementById('pensionTax').setAttribute('value', data.pensionTax)
                document.getElementById('incomeTax').setAttribute('value', data.incomeTax)
                document.getElementById('grossIncome').setAttribute('value', data.grossIncome)
                const taxType =  document.getElementById('taxType').value
                const pensionTax =  document.getElementById('pensionTax').value
                const incomeTax =  document.getElementById('incomeTax').value
                const grossIncome =  document.getElementById('grossIncome').value
                fetch('http://localhost:3000/recordsInc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": 'Bearer ' + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        taxType,
                        pensionTax,
                        incomeTax,
                        grossIncome
                    })
                })
                    .then(data => data.json())
                    .then(result => {
                        console.log('we reached here')
                        console.log('it came back')
                        window.location.replace('http://localhost:3000/getLogin')
                    })

            })
        })
        .catch(err => console.log(err))
})

personBtn.addEventListener('click', () => {
    person.style.display = "block"
    corporation.style.display = "none"
   
})
corpBtn.addEventListener('click', () => {
    corporation.style.display = "block"
    person.style.display = "none"
    personIncome.style.display = "none"
    bothVAT.style.display = 'none'
    document.getElementById('recordIncForm').style.display = 'none'
    document.getElementById('recordVATForm').style.display = 'none'

    if (finalRes) {
        finalRes.remove()
    }
    if (finalVAT) {
        finalVAT.remove()
    }
})

personIncBtn.addEventListener('click', (e) => {
    if (finalRes) {
        finalRes.remove()
    }
    if (finalVAT) {
        finalVAT.remove()
    }
    e.stopPropagation()
    document.getElementById('recordIncForm').style.display = 'none'
    document.getElementById('recordVATForm').style.display = 'none'

    personIncome.style.display = "block"
    bothVAT.style.display = 'none'

})

personVATBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (finalRes) {
        finalRes.remove()
    }
    bothVAT.style.display = 'block'
    personIncome.style.display = "none"
    document.getElementById('recordIncForm').style.display = 'none'

    document.getElementById('recordVATForm').style.display = 'none'

    if (finalVAT) {
        finalVAT.remove()
    }
})
corpVATBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (finalRes) {
        finalRes.remove()
    }
    bothVAT.style.display = 'block'
    personIncome.style.display = "none"
    document.getElementById('recordIncForm').style.display = 'none'
    document.getElementById('recordVATForm').style.display = 'none'
    

    if (finalVAT) {
        finalVAT.remove()
    }
})

submitVAT.addEventListener('submit', (e) => {

    let totalSales = document.getElementById('totVAT1').value
    let taxType = "VAT"
    e.preventDefault()
    fetch('http://localhost:3000/totalVAT', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            totalSales,
            taxType
        })

    })
        .then(result => result.json())
        .then(data => {
            
            if (data.messageVAT) {
                let newDiv = document.createElement('div')
                newDiv.setAttribute('id', 'noVAT')
                newDiv.innerHTML = `${data.messageVAT}`
                mainChoice.appendChild(newDiv)
                finalVAT = document.getElementById('noVAT');
                personIncome.style.display = "none"
                bothVAT.style.display = 'none'
                document.getElementById('recordVATForm').style.display = 'none'
            }
            else {
                let newDiv = document.createElement('div')
                newDiv.setAttribute('id', 'finalVAT')
                newDiv.innerHTML = `
        <p>Your VAT payable is ${data.totalVAT}</p>
        
        `;

                mainChoice.appendChild(newDiv)

                finalVAT = document.getElementById('finalVAT');
                personIncome.style.display = "none"
                bothVAT.style.display = 'none'
                document.getElementById('recordVATForm').style.display = 'block'

                document.getElementById('tryFormVAT').addEventListener('submit', (e) => {
                    e.preventDefault()
                    document.getElementById('taxType').setAttribute('value', data.taxType)
                    document.getElementById('totalVAT').setAttribute('value', data.totalVAT)
                    const taxType =  document.getElementById('taxType').value
                    const totalVAT =  document.getElementById('totalVAT').value
                    
                 return   fetch('http://localhost:3000/recordsVAT', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            taxType,
                            totalVAT
                            
                        })
                    })
                        .then(data => data.json())
                        .then(result => {
                          console.log('we get here?')
                            window.location.replace('http://localhost:3000/getLogin')
                        })
    
                })

            }
        })
        .catch(err => console.log(err))
})


