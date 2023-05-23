import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { auth, loginCheck, addUser } from "./firebase.js"
import { showMessage } from "./showmessage.js"

const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const logout = document.querySelector('#logout')
const signupForm = document.querySelector('#signupForm')
const loginForm = document.querySelector('#login-form')

window.addEventListener("DOMContentLoaded", async (e) => {
  loginCheck(loggedOutLinks, loggedInLinks)
})

loginForm.addEventListener('submit', async e => {
  e.preventDefault()
  const email = loginForm['loginEmail'].value
  const password = loginForm['loginPassword'].value
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    const modal = bootstrap.Modal.getInstance(document.querySelector('#loginModal'))
    modal.hide()
    sessionStorage.setItem('loginUser', email)
    loginCheck(loggedOutLinks, loggedInLinks)
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
    sessionStorage.setItem('loginUser', email)
    loginCheck(loggedOutLinks, loggedInLinks)
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

logout.addEventListener('click', async () => {
  await signOut(auth)
  sessionStorage.removeItem('loginUser')
  loginCheck(loggedOutLinks, loggedInLinks)
  showMessage("Signed out")
})