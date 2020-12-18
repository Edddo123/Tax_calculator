const form = document.getElementById('feedForm')
const content = document.getElementById('content')



form.addEventListener('submit', addPost)






function addPost(e) {
    e.preventDefault()
    const postCont = content.value

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
    .then(res=>res.json())
    .then(message=> {
        console.log(message)
        window.location.replace('http://localhost:3000/getPosts')
    })

}