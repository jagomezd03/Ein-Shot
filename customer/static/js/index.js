import { addUser } from "./firebase.js";
import { showMessage } from "./showmessage.js";
const datetime = new Date()
const regForm = document.querySelector('#regForm')

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
        const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
        const datetimestamp = day + ", " + datetime.getFullYear() + "/" + (datetime.getMonth() + 1) + "/" + datetime.getDate() + " " + datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds();
        try {
            addUser(date, gender, datetimestamp)
            setTimeout(() => {
                window.location.href = "home";
            }, 200);
        } catch (error) {
            showMessage("Something went wrong: " + error.code, "error");
        }
    } else {
        showMessage("+18 years old only", "error")
    }

})