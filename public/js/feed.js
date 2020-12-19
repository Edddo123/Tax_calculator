
const form = document.getElementById('feedForm')
const content = document.getElementById('content')


form.addEventListener('submit', addPost)
// form.addEventListener('submit', getSocket)


const socket = io()

socket.on('message', result=> {
    console.log(result)
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
    `
    container.appendChild(ul)
})


// function getSocket(e) {
//     e.preventDefault()
//     const postContent = content.value
//     socket.emit('contents', postContent)
// }



function addPost(e) {
    e.preventDefault()
    let postCont = content.value
    
    fetch('http://localhost:3000/addPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        },
        body : JSON.stringify({
            content : postCont
        })
    
    })
    .then(res=> {
        res.json()})
    .then(message=> {
        
        // window.location.replace('http://localhost:3000/getPosts')
    })

}

