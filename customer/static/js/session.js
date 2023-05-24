import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { query, collection, where, getDocs } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { auth, loginCheck, addUserForm, db } from "./firebase.js"
import { showMessage } from "./showmessage.js"

const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const logout = document.querySelector('#logout')
const signupForm = document.querySelector('#signupForm')
const loginForm = document.querySelector('#login-form')

const id =""

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
    console.log(email)
    modal.hide()
    const q = query(collection(db, 'users'), where("email", "==", email));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const d = doc.data()
      sessionStorage.setItem('loginUser', d.id)
    })
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
    const datetime = new Date()
    addUserForm(userCredentials.user.uid, userCredentials.user.email, datetime)
    sessionStorage.setItem('loginUser', userCredentials.user.uid)
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