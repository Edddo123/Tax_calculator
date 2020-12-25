const next = document.getElementById('next')
const prev = document.getElementById('prev')
const container = document.getElementById('recordContainer')
const logoutBtn = document.getElementById('Logout')

let page = 1

next.addEventListener('click', goNext)
prev.addEventListener('click', goPrev)

logoutBtn.addEventListener('click', logMeOut)
function logMeOut() {
    localStorage.removeItem("jwt");
}

function goNext() {
    page++
    fetch('http://localhost:3000/records?page=' + page, {
        headers : {
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }
    })
    .then(result=> result.json())
    .then(data => {
        container.innerHTML = "";
        let taxAm = {taxAmount : "Tax Types"};
        console.log(data)
        for (let i=0; i<data.perPage; i++) {
            for (let obj in data.data[i]._doc.Tax_Amount) {
                taxAm.taxAmount += `<li>${obj} : ${data.data[i]._doc.Tax_Amount[obj].toFixed(2)}</li>`
            }
            container.innerHTML += `<ul class="record">
            <li> Tax : ${data.data[i]._doc.Tax_Type}
            </li>
           

                <li>
                    ${taxAm.taxAmount}
                </li>

              
                    <li>Record created at:${data.data[i].createdAt}
                    </li>
                    <input type="hidden" value="${data.data[i]._doc._id}" name="recordId" class="hidden"
                        id="${data.data[i]._doc._id}M">
                    <button type="button" onclick="deleteRecord(this)" class="btn">Delete</button>
        </ul>`
        taxAm.taxAmount = "Tax Types";
        }
        

          
        }) 
        .catch(err => console.log(err))

  
}

function goPrev() {
    if(page > 1) {
        page--
    }
    else page = 1
    
  
    fetch('http://localhost:3000/records?page=' + page, {
        headers : {
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }
    })
    .then(result=> result.json())
    .then(data => {
        container.innerHTML = "";
        let taxAm = {taxAmount : "Tax Types"};
        console.log(data)
        for (let i=0; i<data.perPage; i++) {
            for (let obj in data.data[i]._doc.Tax_Amount) {
                taxAm.taxAmount += `<li>${obj} : ${data.data[i]._doc.Tax_Amount[obj].toFixed(2)}</li>`
            }
            container.innerHTML += `<ul class="record">
            <li> Tax : ${data.data[i]._doc.Tax_Type}
            </li>
           

                <li>
                    ${taxAm.taxAmount}
                </li>

              
                    <li>Record created at:${data.data[i].createdAt}
                    </li>
                    <input type="hidden" value="${data.data[i]._doc._id}" name="recordId" class="hidden"
                        id="${data.data[i]._doc._id}M">
                    <button type="button" onclick="deleteRecord(this)" class="btn">Delete</button>
        </ul>`
        taxAm.taxAmount = "Tax Types";
        }
        

          
        }) 
        .catch(err => console.log(err))

    
}






const deleteRecord = (btn) => {
    const recordId = btn.parentNode.querySelector('[name=recordId]').value
    const recordElement = btn.closest('ul')
   

    fetch('http://localhost:3000/deleteRecord/' + recordId, {
        method: 'DELETE',
        headers : {
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }
    })
    .then(result => result.json())
    .then(data=> {
        console.log('we are here boiz')
        recordElement.remove()
    })
    .catch(err=> {
        console.log(err)
    })

}