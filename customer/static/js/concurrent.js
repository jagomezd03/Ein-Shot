import { onGetUsers } from "./firebase.js";

const concurrentList = document.querySelector('#emp') //Storing the body's table
const today = document.querySelector('#buttonInfo')
let aux = 0;

function verifyToday(date) {
    const m = date.getMonth()
    const d = date.getDate()
    const y = date.getFullYear()
    const actualDate = new Date()
    console.log(m, actualDate.getDate())
    if (!(actualDate.getFullYear()) == y) {
        return false
    } else if (!(actualDate.getMonth()) == m) {
        return false
    } else if (!(actualDate.getDate() == d)) {
        return false
    } else return true
}

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetUsers((querySnapshot) => { //Geting the employees
        querySnapshot.forEach((doc) => {
            const use = document.getElementById(doc.id)//Storing the id from each document reached from database
            const using = doc.data().registrado
            if (using == "No") {
                if (use == null) { //Conditional to prevent adding repeated elements
                    let q = doc.data()//Storing the data from each document
                    const e =  new Date(q.fecha_nacimiento.seconds * 1000)
                    const w = new Date(q.datetime.seconds * 1000)
                    if ((verifyToday(w))) {
                        aux = aux + 1
                    }
                    //Inserting the data of each document to the table
                    concurrentList.innerHTML += `
                    <tr id=${doc.id}>
                        <th scope='row'>${doc.id}</th>
                        <td>${q.genero}</td>
                        <td style="text-align: right;">${e}</td>
                        <td>${w}</td>
                    </tr>
                    `;
                }
            }
        });
        today.innerHTML = aux;
    })
})