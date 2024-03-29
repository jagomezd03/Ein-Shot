import { onGetProducts, saveProduct, deleteProduct, getProduct, updateProduct, validateName, storage, uploadImage, getUrl } from "./firebase.js";
import { showMessage } from "./showmessage.js";

const addForm = document.getElementById('addForm') //Storing the add form
const updateForm = document.getElementById('updateForm') // Storing the update form
const productList = document.querySelector('#emp') //Storing the body's table
const clear = document.getElementById('clear')
const uploadImg = document.getElementById("imgFile")
const updateUploadImage = document.getElementById("updImgFile")

let editStatus = false; //Global const to help us with the update/save product
let identify, dlt, modal = ""//Global const to help us storing the id/Global const to help us storing the row
var fileItem, fileName, updtFileItem, updtFileName

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetProducts((querySnapshot) => { //Geting the products
        querySnapshot.forEach((doc) => {
            const use = document.getElementById(doc.id)//Storing the id from each document reached from database
            if (use == null) { //Conditional to prevent adding repeated elements
                let q = doc.data()//Storing the data from each document
                //Inserting the data of each document to the table
                productList.innerHTML += `
                <tr id=${doc.id}>
                    <th>${doc.id}</th>
                    <td>${q.nombre}</td>
                    <td>${q.tipo}</td>
                    <td>${q.cantidad}</td>
                    <td>${q.unidades}</td>
                    <td>$${q.precio}</td>
                    <td><img src="${q.url_img}"></img></td>
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
        const btnsDelete = productList.querySelectorAll(".btn-delete");//Storing the info from the selected row
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async (target) => {
                try {
                    let ident = target.srcElement.offsetParent.firstElementChild.id//Storing the row's id
                    await deleteProduct(ident);//Using the function from firebase.js
                    dlt = document.getElementById(ident)//Getting the whole tag related to the id
                    dlt.remove()//Removing the row from the recently deleted product
                    showMessage("Producto Eliminado", "error")
                } catch (error) {
                    console.log(error)
                    showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "Error")
                }
            })
        );

        //Edit button action
        const btnsEdit = productList.querySelectorAll(".btn-edit");//Storing the info from the selected row
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const aux = e.srcElement.offsetParent.firstElementChild.id //Storing the row's id
                    const doc = await getProduct(aux);//Using the function from firebase.js
                    const pr = doc.data();//Storing the data from the selected employee
                    //Adding the values to the modal
                    updateForm['updName'].setAttribute('value', pr.nombre)
                    updateForm['updTypeP'].setAttribute('value', pr.tipo)
                    updateForm['updQty'].setAttribute('value', pr.cantidad)
                    updateForm['updUnds'].setAttribute('value', pr.unidades)
                    updateForm['updPrice'].setAttribute('value', pr.precio)
                    identify = aux //Storing the id to the global id
                } catch (error) {
                    console.log(error);
                    showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "error")
                }
            });
        });
    });
});

clear.addEventListener("click", async (e) => {
    var getName = document.querySelectorAll("input")
    getName.forEach((doc) => {
        doc.value = ""
    })
})

uploadImg.addEventListener("change", async (e) => {
    fileItem = e.target.files[0];
    fileName = fileItem.name
    console.log(fileName)
})

updateUploadImage.addEventListener("change", async (e) => {
    updtFileItem = e.target.files[0];
    updtFileName = updtFileItem.name
    console.log(updtFileName)
})

addForm.addEventListener("submit", async (e)=> {
    //Preventing from closing
    e.preventDefault();
    //Gather info
    const fecha = new Date()
    const name = addForm['name'].value
    const typeP = addForm['typeP'].value
    const qty = addForm['qty'].value
    const unds = addForm['unds'].value
    const price = addForm['price'].value
    console.log(fileName)
    //Validate info
    if (!(validateName(name))) {
        return false
    } else if (qty == "") {
        showMessage("Indique la cantidad en ml", "error")
        return false
    } else if (unds == "") {
        showMessage("Indique las unidades disponibles", "error")
        return false
    } else if (price == "") {
        showMessage("Indique el precio del producto", "error")
        return false
    } 
    //Try Catch
    try {
        //Add new product
        const upload = await uploadImage(fileName, fileItem)
        const productUrl = await getUrl(upload.ref)
        const productRef = await saveProduct(name, typeP, qty, unds, price, productUrl, fecha);
        modal = bootstrap.Modal.getInstance(document.querySelector('#addModal'))
        modal.hide()
        showMessage("Producto #" + productRef.id + " añadido")
    } catch (error) {
        console.log(error);
        showMessage("Ha ocurrido un error, por favor comunicarse con soporte", "Error")
    }
});

updateForm.addEventListener("submit", async (e) => {
    //Preventing from closing
    e.preventDefault();
    //Gather info
    const name = updateForm['updName'].value
    const typeP = updateForm['updTypeP'].value
    const qty = updateForm['updQty'].value
    const unds = updateForm['updUnds'].value
    const price = updateForm['updPrice'].value
    //Validate info
    if (!(validateName(name))) {
        return false
    } else if (qty == "") {
        showMessage("Indique la cantidad en ml", "error")
        return false
    } else if (unds == "") {
        showMessage("Indique las unidades disponibles", "error")
        return false
    } else if (price == "") {
        showMessage("Indique el precio del producto", "error")
        return false
    }
    //Try Catch
    try {
        //Add new product
        const upload = await uploadImage(updtFileName, updtFileItem)
        const productUrl = await getUrl(upload.ref)
        await updateProduct(identify, {
            nombre: name,
            tipo: typeP,
            cantidad: qty,
            unidades: unds,
            precio: price,
            url_img: productUrl
        });
        modal = bootstrap.Modal.getInstance(document.querySelector('#updateModal'))
        modal.hide()
        showMessage("Producto #" + identify + " actualizado")//Alert popup
        const updP = document.getElementById(identify)//Storing the tr by his id
        updP.innerHTML =/*Updating the employee info*/ `
            <tr id=${identify}>
                <th>${identify}</th>
                <td>${name}</td>
                <td>${typeP}</td>
                <td>${qty}</td>
                <td>${unds}</td>
                <td>${price}</td>
                <td><img src="${productUrl}"></img></td>
                <td>
                <button class="btn btn-outline-warning btn-edit" data-bs-toggle="modal" data-bs-target="#updateModal" id="${identify}"><i class='fas fa-pencil-alt'></i></button>
                <button class="btn btn-outline-danger btn-delete" id="${identify}"><i class='fas fa-trash'></i></button>
                </td>
            </tr>
            `;
    } catch (error) {
        console.log(error);
        showMessage("Ha ocurrido un error, por favor notificarlo con soporte", "error")
    }
});