import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { auth, db } from "./firebase.js"
import { setupProducts } from "./productList.js"
import './sessionsForm.js'
//Identificar los containers
const signUpButton = document.getElementById('signupModal');
const signInButton = document.getElementById('loginModal');
const container = document.getElementById('container');

//Overlay Panel Derecho
signUpButton.addEventListener('click', () => {
  container.classList.toggle("right-panel-active");
});

//Overlay Panel Izquierdo
signInButton.addEventListener('click', () => {
  container.classList.toggle("right-panel-active");
});

const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const logout = document.querySelector('#logout')

const loginCheck = (user) => {//Login Check
  if (user) {
    loggedOutLinks.forEach(link => link.style.display = 'none')
    loggedInLinks.forEach(link => link.style.display = 'block')
  } else {
    loggedOutLinks.forEach(link => link.style.display = 'block')
    loggedInLinks.forEach(link => link.style.display = 'none')
  }
}

onAuthStateChanged(auth, async (user) => { //Showing products if the user is registered
  if (user) {
    const querySnapshot = await getDocs(collection(db, 'products'))
    setupProducts(querySnapshot.docs)
  } else {
    setupProducts([])
  }
  loginCheck(user)
})

logout.addEventListener('click', async () => {
  await signOut(auth)
  showMessage("Signed out")
}) 