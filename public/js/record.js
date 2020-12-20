


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