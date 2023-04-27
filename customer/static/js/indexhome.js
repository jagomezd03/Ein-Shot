import { insert } from "./firebase.js";
const welcome = document.querySelector('#welcome')
const ss = sessionStorage.getItem('login')
if (ss != null) {
    try {
        await insert(welcome, ss)
    } catch (error) { 
        console.log(error)
    }
}