
const form = document.getElementById('feedForm')
const content = document.getElementById('content')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const logoutBtn = document.getElementById('Logout')

form.addEventListener('submit', addPost)

let page = 1

next.addEventListener('click', goNext)
prev.addEventListener('click', goPrev)

logoutBtn.addEventListener('click', logMeOut)
function logMeOut() {
    localStorage.removeItem("jwt");
}

const socket = io()



async function goNext() {
    const container = document.getElementById('postContainer')
    page++
    try {
        const result = await fetch('http://localhost:3000/getPosts?page=' + page, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        const data = await result.json()

        container.innerHTML = "";

        console.log(data)
        for (let i = 0; i < data.perPage; i++) {

            container.innerHTML += `<ul class="record" style="border: 2px solid;">
            <li> Posted By : ${data.data[i]._doc.creator} , at:${data.data[i].createdAt}
            </li>
            <p>
            ${data.data[i]._doc.content}
            </p>

            <input type="hidden" value="${data.data[i]._doc._id}" name="postId" class="hidden"
                id="${data.data[i]._doc._id}M">
            <button type="button" onclick="deleteProduct(this)" class="btn">Delete</button>
        </ul>`
        }

    } catch (err) { console.log(err) }


}

async function goPrev() {

    if (page > 1) {
        page--
    }
    else page = 1
    const container = document.getElementById('postContainer')
    try {
        const result = await fetch('http://localhost:3000/getPosts?page=' + page, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        const data = await result.json()
        container.innerHTML = "";

        for (let i = 0; i < data.perPage; i++) {

            container.innerHTML += `<ul class="record" style="border: 2px solid;">
            <li> Posted By : ${data.data[i]._doc.creator} , at:${data.data[i].createdAt}
            </li>
            <p>
            ${data.data[i]._doc.content}
            </p>

            <input type="hidden" value="${data.data[i]._doc._id}" name="postId" class="hidden"
                id="${data.data[i]._doc._id}M">
            <button type="button" onclick="deleteProduct(this)" class="btn">Delete</button>
        </ul>`
        }

    } catch (err) { console.log(err) }


}

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
    for (myObj in hidden) {
        if (hidden[myObj]) {
            arrayForValues.push(hidden[myObj])
        }
    }
    let reformedArray = arrayForValues.filter(p => {
        return p.value === result.deletedPost._id
    })

    const deletedInput = document.getElementById(`${reformedArray[0].value}M`)
    if (deletedInput) {
        const parentElem = deletedInput.closest('ul')
        parentElem.remove()
    }


})





async function addPost(e) {
    e.preventDefault()
    let postCont = content.value
    try {
        const result = await fetch('http://localhost:3000/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                content: postCont
            })
        })
        await result.json()
    } catch (err) {
        console.log(err)
    }

}


const deleteProduct = async (btn) => {
    const postId = btn.parentNode.querySelector('[name=postId]').value
    const postElement = btn.closest('ul')
    try {
        const result = await fetch('http://localhost:3000/deletePost/' + postId, {
            method: 'DELETE',
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        await result.json()

        console.log('we are here boiz')
        postElement.remove()

    } catch (err) {
        console.log(err)
    }

}

