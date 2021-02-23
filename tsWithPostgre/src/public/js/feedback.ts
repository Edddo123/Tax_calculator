
const stars = document.getElementsByClassName('fa')!
const in1 = document.getElementById('inp1')! as HTMLInputElement
const in2 = document.getElementById('inp2')! as HTMLInputElement   
const in3 = document.getElementById('inp3')! as HTMLInputElement
const in4 = document.getElementById('inp4')! as HTMLInputElement
const in5 = document.getElementById('inp5')! as HTMLInputElement

const feedbackForm = document.getElementById('feedbackForm')!




feedbackForm.addEventListener('submit', submitFeedback)


async function submitFeedback(e:Event) {
    e.preventDefault()
    const content = document.getElementById('content')! as HTMLInputElement

    const result = await fetch("http://localhost:3001/addFeedback", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            content: content.value,
        })
    })

    const data = await result.json()
}

