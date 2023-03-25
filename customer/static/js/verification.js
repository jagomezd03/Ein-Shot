import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { showMessage } from "./showMessage.js";
const regForm = document.querySelector('#regForm')

function verifyAge(day, month, year) {
    return new Date(year+18, month-1, day) <= new Date();
}

regForm.addEventListener('submit', async e =>{
    e.preventDefault()
    //Getting the values
    const birthdate = regForm['birthdate'].value
    const gender = regForm['gender'].value
    //Formatting the data
    const y = birthdate.getFullYear();
    const m = birthdate.getMonth() + 1;
    const d = birthdate.getDate()
    const time = datetime.getHours()+':'+datetime.getMinutes()+':'+datetime.getSeconds();
    //Storing value,the function returned
    const v = verifyAge(d,m,y)
    //Timestamp
    const datetime = new Date()
    const date = datetime.getFullYear()+"/"+datetime.getMonth()+"/"+datetime.getDate()+" "+time
    if(v==='true'){
        try {
            const docRef = await addDoc(collection(db, "users"), {
                birthdate: birthdate,
                gender: gender,
                datetime: date
            });
            console.log("Document written with ID: ", docRef.id);
            setTimeout(function(){
                window.location.href = "";
            }, 500); 
        } catch (error) {
            showMessage("Something went wrong: "+error.code, "error");
        }
    } else {
        showMessage("+18 Years Only")
    }
})