import { onGetEmployees, saveEmployee, deleteEmployee, getEmployee, updateEmployee, validateTypedoc } from "./firebase.js"; //Employee Methods
import { validateEmail, validateName, validateDoc, validateNum, validatePassword, validateSurname } from "./firebase.js"; //Form validation methods
import { showMessage } from "./showmessage.js";

const addForm = document.getElementById('addForm') //Storing the form
const updateForm = document.getElementById('updateForm')
const employeeList = document.querySelector('#emp') //Storing the body's table

let identify, dlt, modal = ""//Global const to help us storing the id/Global const to help us storing the row

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetEmployees((querySnapshot) => { //Geting the employees
        querySnapshot.forEach((doc) => {
            const use = document.getElementById(doc.id)//Storing the id from each document reached from database
            if (use == null) { //Conditional to prevent adding repeated elements
                let q = doc.data()//Storing the data from each document
                //Inserting the data of each document to the table
                employeeList.innerHTML += `
                <tr id=${doc.id}>
                    <th>${doc.id}</th>
                    <td>${q.nombre}</td>
                    <td>${q.apellido}</td>
                    <td>${q.tipoDoc}</td>
                    <td>${q.documento}</td>
                    <td>${q.celular}</td>
                    <td>${q.email}</td>
                    <td>
                        <button class="btn btn-outline-warning btn-edit" data-bs-toggle="modal" data-bs-target="#updateModal" id="${doc.id}"><i
                                class='fas fa-pencil-alt'></i></button>
                        <button class="btn btn-outline-danger btn-delete" id="${doc.id}"><i
                                class='fas fa-trash'></i></button>
                    </td>
                </tr>
                `;
            }
        });

        //Delete button action
        const btnsDelete = employeeList.querySelectorAll(".btn-delete");//Storing the info from the selected row
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async (target) => {
                try {
                    let ident = target.srcElement.offsetParent.firstElementChild.id//Storing the row's id
                    await deleteEmployee(ident);//Using the function from firebase.js
                    dlt = document.getElementById(ident)//Getting the whole tag related to the id
                    dlt.remove()//Removing the row from the recently deleted employee
                    showMessage("Empleado #"+ident+" eliminado")
                } catch (error) {
                    console.log(error)
                    showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "Error")
                }
            })
        );

        //Edit button action
        const btnsEdit = employeeList.querySelectorAll(".btn-edit");//Storing the info from the selected row
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const aux = e.srcElement.offsetParent.firstElementChild.id //Storing the row's id
                    const doc = await getEmployee(aux);//Using the function from firebase.js
                    const em = doc.data();//Storing the data from the selected employee
                    //Adding the values to the modal
                    updateForm['updName'].setAttribute('value', em.nombre)
                    updateForm['updSurname'].setAttribute('value', em.apellido)
                    updateForm['updTypeDoc'].setAttribute('value', em.tipoDoc)
                    updateForm['updDoc'].setAttribute('value', em.documento)
                    updateForm['updTel'].setAttribute('value', em.celular)
                    updateForm['updPassword'].setAttribute('value', em.contraseña)
                    updateForm['updEmail'].setAttribute('value', em.email)
                    identify = aux;
                } catch (error) {
                    console.log(error)
                    showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "Error")
                }
            });
        });
    });
});

addForm.addEventListener("submit", async (e) => {
    //Preventing from closing
    e.preventDefault();
    //Gather info
    const datetimeStamp = new Date()
    const name = addForm['name'].value
    const surname = addForm['surname'].value
    const typeDoc = addForm['typeDoc'].value
    const documento = addForm['doc'].value
    const tel = addForm['tel'].value
    const password = addForm['password'].value
    const email = addForm['email'].value
    
    //Validate info
    if (!(validateName(name))) {
        return false;
    } else if (!(validateSurname(surname))) {
        return false;
    } else if (!(validateDoc(documento))) {
        return false
    } else if (!(validateNum(tel))) {
        return false;
    } else if (!(validatePassword(password))) {
        return false
    } else if (!(validateEmail(email))) {
        showMessage("Email", "error")
        return false
    }
    //Try Catch
    try {
        //Add new employee
        const employeeRef = await saveEmployee(name, surname, typeDoc, documento, tel, password, email, datetimeStamp);
        modal = bootstrap.Modal.getInstance(document.querySelector('#addModal'))
        modal.hide()
        showMessage("Empleado #" + employeeRef.id + " añadido")
    } catch (error) {
        console.log(error)
        showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "Error")
    }
});

updateForm.addEventListener("submit", async (e) => {
    //Preventing from closing
    e.preventDefault();
    //Gather info
    const name = updateForm['updName'].value
    const surname = updateForm['updSurname'].value
    const typeDoc = updateForm['updTypeDoc'].value
    const documento = updateForm['updDoc'].value
    const tel = updateForm['updTel'].value
    const password = updateForm['updPassword'].value
    const email = updateForm['updEmail'].value
    //Validate info
    if (!(validateName(name))) {
        return false;
    } else if (!(validateSurname(surname))) {
        return false;
    } else if (!(validateDoc(documento))) {
        return false
    } else if (!(validateTypedoc(typeDoc))){
        return false
    } else if (!(validateNum(tel))) {
        return false;
    } else if (!(validatePassword(password))) {
        return false
    } else if (!(validateEmail(email))) {
        showMessage("Email", "error")
        return false
    }
    //Try Catch
    try {
        //Add new employee
        await updateEmployee(identify, {
            nombre: name,
            apellido: surname,
            tipoDoc: typeDoc,
            documento: documento,
            celular: tel,
            contraseña: password,
            email: email
        });
        modal = bootstrap.Modal.getInstance(document.querySelector('#updateModal'))
        modal.hide()
        showMessage("Empleado #" + identify + " actualizado")//Alert popup
        const updE = document.getElementById(identify)//Storing the tr by his id
            updE.innerHTML =/*Updating the employee info*/ `
                <tr id=${identify}>
                    <th>${identify}</th>
                    <td>${name}</td>
                    <td>${surname}</td>
                    <td>${typeDoc}</td>
                    <td>${documento}</td>
                    <td>${tel}</td>
                    <td>${email}</td>
                    <td>
                    <button class="btn btn-outline-warning btn-edit" data-bs-toggle="modal" data-bs-target="#updateModal" id="${identify}"><i class='fas fa-pencil-alt'></i></button>
                    <button class="btn btn-outline-danger btn-delete" id="${identify}"><i class='fas fa-trash'></i></button>
                    </td>
                </tr>
                `;
    } catch (error) {
        console.log(error)
        showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "Error")
    }
});