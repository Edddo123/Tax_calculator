
const submitForm = document.getElementById('loginForm')

const logoutBtn = document.getElementById('Logout')


submitForm.addEventListener('submit', getToken)

logoutBtn.addEventListener('click', logMeOut)
function logMeOut() {
    localStorage.removeItem("jwt");
}

async function getToken(e) {
    let token
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    e.preventDefault()
    try {
        const info = await fetch('http://localhost:3000/postLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const jwt = await info.json()

        token = localStorage.setItem("jwt", jwt.token);
        window.location.replace('http://localhost:3000/getLogin')

    } catch (err) {
        console.log('Not working')
    }
}