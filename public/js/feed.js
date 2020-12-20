
const form = document.getElementById('feedForm')
const content = document.getElementById('content')


form.addEventListener('submit', addPost)
// form.addEventListener('submit', getSocket)


const socket = io()

socket.on('message', result => {
    const container = document.getElementById('postContainer')
    const ul = document.createElement('ul')
    ul.classList.add('record')
    ul.setAttribute('style', 'border: 2px solid;')
    ul.innerHTML = `
    <li> Posted By : ${result.post._doc.creator} , at:${result.post.createdAt}
            </li>
            <p>
                ${result.post._doc.content}
            </p>
            <input type="hidden" value="${result.post._doc._id}" name="postId" class="hidden" id="${result.post._doc._id}M"> 
            <button type="button" onclick="deleteProduct(this)" class="btn">Delete</button> 
           
    `
    container.appendChild(ul)
    document.getElementById('content').value = '';
})

socket.on('deleteMessage', result => {
    // console.log(result)
    const hidden = document.getElementsByClassName('hidden')
    const arrayForValues = []
    for(myObj in hidden) {
        if(hidden[myObj]) {
            arrayForValues.push(hidden[myObj])
        }
    }
    let reformedArray = arrayForValues.filter(p=> {
        return p.value === result.deletedPost._id
    })
    
    const deletedInput = document.getElementById(`${reformedArray[0].value}M`)
    if(deletedInput) {
        const parentElem = deletedInput.closest('ul')
        parentElem.remove()
    }
    
    // hidden.filter(p=> {
    //  return   p.value === result.deletedPost._id
    // })
    
    // console.log(typeof(hidden[0].value))
    // console.log(typeof(result.deletedPost._id))

    

    // console.log(postId)
   

})





function addPost(e) {
    e.preventDefault()
    let postCont = content.value

    fetch('http://localhost:3000/addPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            content: postCont
        })

    })
        .then(res => {
            res.json()
        })
        .then(message => {

            // window.location.replace('http://localhost:3000/getPosts')
        })

}


const deleteProduct = (btn) => {
    const postId = btn.parentNode.querySelector('[name=postId]').value
    const postElement = btn.closest('ul')
   

    fetch('http://localhost:3000/deletePost/' + postId, {
        method: 'DELETE',
        headers : {
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }
    })
    .then(result => result.json())
    .then(data=> {
        console.log('we are here boiz')
        postElement.remove()
    })
    .catch(err=> {
        console.log(err)
    })

}

