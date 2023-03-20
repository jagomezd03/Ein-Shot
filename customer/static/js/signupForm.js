import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { auth } from "./firebase.js"
import { showMessage } from "./showMessage.js"
const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        const signupModal = document.querySelector('#signupModal')
        const modal = bootstrap.Modal.getInstance(signupModal)
        modal.hide()

        showMessage("Welcome "+userCredentials.user.email)
    } catch (error) {
        if(error.code==='auth/invalid-email'){
            showMessage("Invalid Email", "error")
        } else if(error.code==='auth/weak-password'){
            showMessage("The passsword is too weak", "error")
        } else if(error.code==='auth/email-already-in-use'){
            showMessage("Email already used", "error")
        } else if(error.code){
            showMessage("Something went wrong: "+error.code, "error")
        }
    }
})