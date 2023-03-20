import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { auth } from "./firebase.js"
import { showMessage } from "./showMessage.js"

const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', async e =>{
    e.preventDefault()

    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    const modal = bootstrap.Modal.getInstance(document.querySelector('#loginModal'))
    modal.hide()

    try {
        const credentials = await signInWithEmailAndPassword(auth,email,password)
        showMessage("Welcome "+credentials.user.email)

    } catch (error) {
        if(error.code==='auth/wrong-password'){
            showMessage("Wrong Password", "error")
        } else if(error.code==='auth/user-not-found'){
            showMessage("User not found", "error")
        } else if(error.code){
            showMessage("Something went wrong: "+error.code, "error")
        }
    }
})