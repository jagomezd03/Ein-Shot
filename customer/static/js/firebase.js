// Import the functions you need from the SDKs you need
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { showMessage } from "./showmessage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCniD7IxzTb5mH_Dqpu-XoAdCGiDiHUd8A",
    authDomain: "ein-shot.firebaseapp.com",
    projectId: "ein-shot",
    storageBucket: "ein-shot.appspot.com",
    messagingSenderId: "827543084500",
    appId: "1:827543084500:web:b956134eb9d51610258a41",
    measurementId: "G-JZGRVY7L61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)

//Functions for CRUD Employee
export const saveEmployee = async (nombre, apellido, tipoDoc, documento, celular, contraseña, email, fecha) => {
    const employeeRef = addDoc(collection(db, "empleados"), { nombre, apellido, tipoDoc, documento, celular, contraseña, email, fecha });
    return employeeRef
}

export const onGetEmployees = (callback) => onSnapshot(collection(db, "empleados"), callback);

export const deleteEmployee = (id) =>
    deleteDoc(doc(db, "empleados", id))
        .then(() => {
            showMessage("Empleado #" + id + " eliminado")
        });

export const getEmployee = async (id) => {
    const docRef = doc(db, "empleados", id)
    const docSnap = await getDoc(docRef)
    return docSnap
};

export const updateEmployee = (id, newFields) => updateDoc(doc(db, "empleados", id), newFields);

export const getEmployees = () => getDocs(collection(db, "empleados"));

//Functions for CRUD Products
export const saveProduct = async (nombre, tipo, cantidad, unidades, precio, url_img, fecha) => {
    const productRef = addDoc(collection(db, "products"), { nombre, tipo, cantidad, unidades, precio, url_img, fecha });
    return productRef
}

export const onGetProducts = (callback) => onSnapshot(collection(db, "products"), callback);

export const deleteProduct = (id) => deleteDoc(doc(db, "products", id))

export const getProduct = async (id) => {
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)
    return docSnap
};

export const updateProduct = (id, newFields) => updateDoc(doc(db, "products", id), newFields);

export const getProducts = () => getDocs(collection(db, "products"));

//Functions for users
export const onGetConcurrents = (callback) => onSnapshot(collection(db, "users"), callback);

export const createUser = async (uid, email) => {
    const rgst = "Si"
    const userRef = setDoc(doc(db, 'users', uid), {
        id: uid,
        email: email,
        registrado: rgst,
    })
    return userRef
}

export const addUser = async (date, gender, datetimestamp) => {
    const rgst = "No"
    await addDoc(collection(db, "users"), {
        fecha_nacimiento: date,
        genero: gender,
        datetime: datetimestamp,
        registrado: rgst,
    });
}

//Functions to validate Forms
export const validateEmail = (email) => {
    if (!(email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
        showMessage("Email Invalido", "error")
    } else { return true }
};

export const validateName = (name) => {
    if (name == "") {
        showMessage("Por favor llene el campo nombre", "error")
    } else { return true }
}

export const validateSurname = (surname) => {
    if (surname == "") {
        showMessage("Por favor llene el campo apellido", "error")
    } else { return true }
}

export const validateDoc = (doc) => {
    if (doc == "") {
        showMessage("Por favor llene el documento", "Error")
    } else if ((doc.length) < 6) {
        showMessage("El numero de documento es muy corto", "Error")
    } else { return true }
}

export const validateTypedoc = (typeDoc) => {
    if (typeDoc == "") {
        showMessage("Por favor llene el campo Tipo Documento")
    }
}
export const validateNum = (tel) => {
    if (tel == "") {
        showMessage("Por favor llene el campo Celular", "Error")
    } else if ((tel.length) < 10) {
        showMessage("El numero de celular es muy corto", "Error")
    } else { return true }
}

export const validatePassword = (password) => {
    if (password == "") {
        showMessage("Por favor llene el campo contraseña", "Error")
    } else if ((password.length) < 6) {
        showMessage("La contraseña es muy debil", "Error")
    } else { return true }
}