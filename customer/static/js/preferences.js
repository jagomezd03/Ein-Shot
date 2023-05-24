import { updateDoc, doc, getDoc, getDocs, query, collection, where } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { db } from "./firebase.js";
import { showMessage } from "./showmessage.js";

const prefForm = document.getElementById('preferences');
const drinks1 = document.querySelector('#flexRadioDefaultDrinks1');
const tables1 = document.getElementById('flexRadioDefaultTables1');
const privacy1 = document.getElementById('flexRadioDefaultPrivacy1');
const chat1 = document.getElementById('flexRadioDefault5');
const drinks2 = document.getElementById('flexRadioDefaultDrinks2');
const tables2 = document.getElementById('flexRadioDefaultTables2');
const privacy2 = document.getElementById('flexRadioDefaultPrivacy2');
const chat2 = document.getElementById('flexRadioDefault6');
var drinks, tables, privacy, chat
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
let user = getCookie("user");
console.log(user)

window.addEventListener("DOMContentLoaded", async (e) => {
    const us = sessionStorage.getItem('loginUser')
    if (us != null) {
        const q = query(collection(db, 'users'), where("id", "==", us));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (d) => {
            const docRef = doc(db, "users", d.id)
            const docSnap = await getDoc(docRef)
            const aux = docSnap.data()
            console.log(aux.preferences)
            if (aux.preferences[0]) {
                drinks1.setAttribute('checked', 'checked')
                drinks2.removeAttribute('checked')
            }
            if (aux.preferences[1]) {
                tables1.setAttribute('checked', 'checked')
                tables2.removeAttribute('checked')
            }
            if (aux.preferences[2] == "Privado") {
                privacy1.setAttribute('checked', 'checked')
                privacy2.removeAttribute('checked')
            }
            if (aux.preferences[3]) {
                chat1.setAttribute('checked', 'checked')
                chat2.removeAttribute('checked')
            }
            prefForm['limit'].setAttribute('value', aux.preferences[4])
        })
    } else if (us == null) {
        const docRef = doc(db, "users", user)
        const docSnap = await getDoc(docRef)
        const aux = docSnap.data()
        console.log(aux.preferences)
        if (aux.preferences[0]) {
            drinks1.setAttribute('checked', 'checked')
            drinks2.removeAttribute('checked')
        }
        if (aux.preferences[1]) {
            tables1.setAttribute('checked', 'checked')
            tables2.removeAttribute('checked')
        }
        if (aux.preferences[2] == "Privado") {
            privacy1.setAttribute('checked', 'checked')
            privacy2.removeAttribute('checked')
        }
        if (aux.preferences[3]) {
            chat1.setAttribute('checked', 'checked')
            chat2.removeAttribute('checked')
        }
        prefForm['limit'].setAttribute('value', aux.preferences[4])
    }
})

prefForm.addEventListener("submit", async (e) => {
    //Preventing from closing
    e.preventDefault();
    //Gather info
    const limit = prefForm['limit'].value
    if (drinks1.checked) {
        drinks = true
    } else {
        drinks = false
    }
    if (tables1.checked) {
        tables = true
    } else {
        tables = false
    }
    if (privacy1.checked) {
        privacy = "Privado"
    } else {
        privacy = "Publico"
    }
    if (chat1.checked) {
        chat = true
    } else {
        chat = false
    }
    try {
        if (sessionStorage.getItem('loginUser') != null) {
            const us = sessionStorage.getItem('loginUser')
            const q = query(collection(db, 'users'), where("id", "==", us));
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((d) => {
                const reference = doc(db, 'users', d.id)
                updateDoc(reference, {
                    preferences: [drinks, tables, privacy, chat, limit]
                })
                showMessage("Preferencias guardadas correctamente")
            })
        } else {
            console.log(user)
            const reference = doc(db, 'users', user)
            updateDoc(reference, {
                preferences: [drinks, tables, privacy, chat, limit]
            })
            showMessage("Preferencias guardadas correctamente")
        }
    } catch (error) {
        console.log(error)
        showMessage("Error Inesperado, por favor comunicarse con soporte", "error")
    }
})