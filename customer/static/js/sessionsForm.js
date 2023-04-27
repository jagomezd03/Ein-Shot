import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { addUser, auth } from "./firebase.js"
import { showMessage } from "./showmessage.js"

const signupForm = document.querySelector('#signupForm')
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', async e => {
    e.preventDefault()

    const email = loginForm['loginEmail'].value
    const password = loginForm['loginPassword'].value

    const modal = bootstrap.Modal.getInstance(document.querySelector('#loginModal'))
    modal.hide()

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        showMessage("Welcome " + credentials.user.email)

    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            showMessage("Wrong Password", "error")
        } else if (error.code === 'auth/user-not-found') {
            showMessage("User not found", "error")
        } else if (error.code) {
            showMessage("Something went wrong: " + error.code, "error")
        }
    }
})

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm['signupEmail'].value
    const password = signupForm['signupPassword'].value

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        addUser(userCredentials.user.uid, userCredentials.user.email, userCredentials.user.password)
        const signupModal = document.querySelector('#signupModal')
        const modal = bootstrap.Modal.getInstance(signupModal)
        modal.hide()
        showMessage("Welcome " + userCredentials.user.email)
    } catch (error) {
        if (error.code === 'auth/invalid-email') {
            showMessage("Invalid Email", "error")
        } else if (error.code === 'auth/weak-password') {
            showMessage("The passsword is too weak", "error")
        } else if (error.code === 'auth/email-already-in-use') {
            showMessage("Email already used", "error")
        } else if (error.code) {
            showMessage("Something went wrong: " + error.code, "error")
        }
    }
})