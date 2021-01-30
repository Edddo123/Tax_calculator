const loginForm = document.getElementById('loginBtn')! as HTMLButtonElement
loginForm.addEventListener("click", loggedIn)

async function loggedIn(e:Event) {
  e.preventDefault()
  try{
  const loginEmail = document.getElementById('loginEmail')! as HTMLInputElement
  const loginPwd = document.getElementById('loginPwd')! as HTMLInputElement
  const result = await fetch("http://localhost:3001/postlogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({loginEmail:loginEmail.value, loginPwd: loginPwd.value})
  })
  const data = await result.json()
  if(data.token) {
      localStorage.setItem("jwt", data.token)
      window.location.replace("http://localhost:3001/records/?tok=Bearer "+ localStorage.getItem("jwt"))
  }
  else console.log(data.message)

} catch(err) {
  console.log(err)
}
}