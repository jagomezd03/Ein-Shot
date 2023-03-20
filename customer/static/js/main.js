import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { auth } from "./firebase.js"
import { loginCheck } from "./logincheck.js"

import './signupForm.js'
import './loginForm.js'
import './logout.js'

onAuthStateChanged(auth, async (user)=>{
  loginCheck(user)
})