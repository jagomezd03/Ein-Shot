import { signOut } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from "./showMessage.js"
const logout = document.querySelector('#logout')

logout.addEventListener('click', async () => {
  await signOut(auth)
  showMessage("Signed out")
}) 