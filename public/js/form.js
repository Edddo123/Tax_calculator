const personBtn = document.getElementById('personBtn')
const corpBtn = document.getElementById('corpBtn')
const person = document.getElementById('person')
const corporation = document.getElementById('corporation')
const personIncome = document.getElementById('personIncome')
const personIncBtn = document.getElementById('personIncBtn')
const mainChoice = document.getElementById('choice')

let finalRes
const submitForm = document.getElementById('form')




submitForm.addEventListener('submit', (e)=> {
    let dropDown = document.getElementById('residence').value
    let statusRadio
    let benefits
    if(document.getElementById('employed').checked) {
        statusRadio = document.getElementById('employed').value
    } else if(document.getElementById('self-employed').checked) {
        statusRadio = document.getElementById('self-employed').value
    }
    else statusRadio = document.getElementById('other').value
    let totIncome = document.getElementById('totIncome').value //its string

    if(document.getElementById('yes').checked) {
        benefits = document.getElementById('yes').value
    } else {
        benefits = document.getElementById('no').value
    }
    
    e.preventDefault()
    fetch('http://localhost:3000/persnInc', {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        //its same as dropDown : dropDown
        body : JSON.stringify({
            dropDown, 
            statusRadio,
            totIncome,
            benefits
        })
    })
    .then(result=> result.json())
    .then(data=> {
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
    })
    .catch(err=> console.log(err))
})

personBtn.addEventListener('click', ()=> {
    person.style.display = "block"
    corporation.style.display = "none" 
})
corpBtn.addEventListener('click', ()=> {
    corporation.style.display = "block"
    person.style.display = "none" 
    personIncome.style.display = "none"
    finalRes.remove()
})

personIncBtn.addEventListener('click', (e)=> {
    if(finalRes) {
        finalRes.remove()
    }
    e.stopPropagation()
    personIncome.style.display = "block"
})