import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { auth,db } from "./firebase.js"
import { loginCheck } from "./logincheck.js"
import { setupProducts } from "./productList.js"

import './signupForm.js'
import './loginForm.js'
import './logout.js'

onAuthStateChanged(auth, async (user)=>{
  if(user){
    const querySnapshot = await getDocs(collection(db, 'products'))
    setupProducts(querySnapshot.docs)
  } else{
    setupProducts([])
  }
  loginCheck(user)
})