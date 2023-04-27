import { showMessage } from "./showmessage.js";
import { onGetOrders, getOrder } from "./firebase.js"

const seeForm = document.getElementById('seeForm')
const orderList = document.getElementById('seeModal')

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetOrders((querySnapshot) => { //Geting the products
        querySnapshot.forEach((doc) => {
            const use = document.getElementById(doc.id)//Storing the id from each document reached from database
            if (use == null) { //Conditional to prevent adding repeated elements
                let q = doc.data()//Storing the data from each document
                //Inserting the data of each document to the table
                orderList.innerHTML += `
                <tr id=${doc.id}>
                    <th>${doc.id}</th>
                    <td>${q.mesa}</td>
                    <td>${q.cantidad_productos}</td>
                    <td>${q.subtotal}</td>
                    <td>${q.date}</td>
                    <td>
                        <button class="btn btn-outline-info btn-see" data-bs-toggle="modal" data-bs-target="#seeModal" id="${doc.id}"><i
                                class='fas fa-pencil-alt'></i></button>
                    </td>
                </tr>
                `;
            }
        });
        const btnsSee = orderList.querySelectorAll(".btn-see");//Storing the info from the selected row
        btnsSee.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const aux = e.srcElement.offsetParent.firstElementChild.id //Storing the row's id
                    const doc = await getOrder(aux);//Using the function from firebase.js
                    const pr = doc.data();//Storing the data from the selected employee
                    //Formatting values from the modal and bdd
                    seeForm['updName'].setAttribute('value', pr.nombre)
                    seeForm['updTypeP'].setAttribute('value', pr.tipo)
                    seeForm['updQty'].setAttribute('value', pr.cantidad)
                    seeForm['updUnds'].setAttribute('value', pr.unidades)
                    seeForm['updPrice'].setAttribute('value', pr.precio)
                    identify = aux //Storing the id to the global id
                } catch (error) {
                    console.log(error);
                    showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "error")
                }
            });
        });
    })
})