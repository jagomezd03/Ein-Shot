import { addUser } from "./firebase.js";
import { showMessage } from "./showmessage.js";
const datetime = new Date()
const regForm = document.querySelector('#regForm')
let modal = ""

function setCoookie(value){
    const d = new Date()
    d.setTime(d.getTime() + 86400000)
    let expires = "expires="+d.toUTCString();
    document.cookie = "user="+value+";"+expires+";"
}

//Function to solve a problem related with the timezone on the input
function correction(date) {
    const d = date.getTime() + 18000000
    const nd = new Date(d)
    return nd
}

function verifyAge(date) {
    const yd = date.getFullYear(); const md = date.getMonth() + 1; const dd = date.getDate();
    return new Date(yd + 18, md - 1, dd) <= new Date();
}

regForm.addEventListener('submit', async e => {
    e.preventDefault()
    //Getting the values
    const dateInput = new Date(regForm['birthdate'].value)
    const d = correction(dateInput)
    const weekday = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let day = weekday[datetime.getDay()]
    const gender = regForm['gender'].value
    //Timestamp
    const c = verifyAge(d, datetime)
    if (c) {
        const date = new Date (d)
        const datetimestamp = new Date(datetime)
        try {
            const userRef = await addUser(date, gender, datetimestamp)
            setCoookie("1")
            modal = bootstrap.Modal.getInstance(document.getElementById('modal'))
            modal.hide()
        } catch (error) {
            console.log(error)
            showMessage("Something went wrong: " + error.code, "error");
        }
    } else {
        showMessage("+18 years old only", "error")
    }
})