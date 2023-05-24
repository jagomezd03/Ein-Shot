// Import the functions you need from the SDKs you need
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
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
export const storage = getStorage(app)

//Functions for index page carousels
export const cerveza = async (v) => {
    const q = query(collection(db, 'products'), where("tipo", "==", "Cerveza"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const da = doc.data()
        v.innerHTML +=  `<li class="card">
                            <div class="img"><img src="${da.url_img}" alt="img" draggable="false"></div>
                            <h2>${da.nombre} x${da.cantidad}</h2>
                            <div class="price">
                            <span class="price_num">$${da.precio}</span>
                            </div>
                        </li>
            `
    })
}

export const licor = async (v) => {
    const q = query(collection(db, 'products'), where("tipo", "==", "Licor"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const da = doc.data()
        v.innerHTML +=  `<li class="card">
                            <div class="img"><img src="${da.url_img}" alt="img" draggable="false"></div>
                            <h2>${da.nombre} x${da.cantidad}</h2>
                            <div class="price">
                            <span class="price_num">$${da.precio}</span>
                            </div>
                        </li>
            `
    })
}

export const shot = async (v) => {
    const q = query(collection(db, 'products'), where("tipo", "==", "Shot"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const da = doc.data()
        v.innerHTML +=  `<li class="card">
                            <div class="img"><img src="${da.url_img}" alt="img" draggable="false"></div>
                            <h2>${da.nombre} x${da.cantidad}</h2>
                            <div class="price">
                            <span class="price_num">$${da.precio}</span>
                            </div>
                        </li>
            `
    })
}

export const energizante = async (v) => {
    const q = query(collection(db, 'products'), where("tipo", "==", "Energizantes"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const da = doc.data()
        v.innerHTML +=  `<li class="card">
                            <div class="img"><img src="${da.url_img}" alt="img" draggable="false"></div>
                            <h2>${da.nombre} x${da.cantidad}</h2>
                            <div class="price">
                            <span class="price_num">$${da.precio}</span>
                            </div>
                        </li>
            `
    })
}

export const vino = async (v) => {
    const q = query(collection(db, 'products'), where("tipo", "==", "Vino"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const da = doc.data()
        v.innerHTML +=  `<li class="card">
                            <div class="img"><img src="${da.url_img}" alt="img" draggable="false"></div>
                            <h2>${da.nombre} x${da.cantidad}</h2>
                            <div class="price">
                            <span class="price_num">$${da.precio}</span>
                            </div>
                        </li>
            `
    })
}

export const noAlcohol = async (v) => {
    const q = query(collection(db, 'products'), where("tipo", "==", "Sin Alcohol"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const da = doc.data()
        v.innerHTML +=  `<li class="card">
                            <div class="img"><img src="${da.url_img}" alt="img" draggable="false"></div>
                            <h2>${da.nombre} x${da.cantidad}</h2>
                            <div class="price">
                            <span class="price_num">$${da.precio}</span>
                            </div>
                        </li>
            `
    })
}

export const snacks = async (v) => {
    const q = query(collection(db, 'products'), where("tipo", "==", "Snack"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const da = doc.data()
        v.innerHTML +=  `<li class="card">
                            <div class="img"><img src="${da.url_img}" alt="img" draggable="false"></div>
                            <h2>${da.nombre} x${da.cantidad}</h2>
                            <div class="price">
                            <span class="price_num">$${da.precio}</span>
                            </div>
                        </li>
            `
    })
}

//Functions for session employee
export const getEmployeeSession = async (email, pass) => {
    const q = query(collection(db, "empleados"), where("email", "==", email))
    const w = await getDocs(q)
    w.forEach((doc) => {
        const z = doc.data()
        if (z.contraseña == pass) {
            sessionStorage.setItem('login', z.nombre + " " + z.apellido)
        }
    });
}

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
export const uploadImage = (filename, fileitem) => {
    const storageRef = ref(storage, 'productos/' + filename)
    return uploadBytes(storageRef, fileitem)
}

export const getUrl = (refe) => {
    return getDownloadURL(ref(storage, refe))
}

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

//Functiosn for users
export const onGetUsers = (callback) => onSnapshot(collection(db, "users"), callback);

//Functions for index form
export const addUser = async (fecha_nacimiento, genero, datetime) => {
    const registrado = "No"
    const q = await addDoc(collection(db, "users"), {
        fecha_nacimiento,
        genero,
        datetime,
        registrado,
    });
    return q
}

export const addUserForm = async (id, email, datetime) => {
    const registrado = "Si"
    addDoc(collection(db, "users"), {
        id,
        email,
        datetime,
        registrado
    });
}

//Functions for crud orders
export const onGetOrders = (callback) => onSnapshot(collection(db, "orders"), callback)

export const getOrder = async (id) => {
    const docRef = doc(db, "orders", id)
    const docSnap = await getDoc(docRef)
    return docSnap
};

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

//insert something
export const insert = async (sector, insertThat) => {
    if (sector.value != null || sector.value != "") {
        sector.innerHTML = insertThat;
    } else { sector.innerHTML = ""; }
}

export const loginCheck = async (loggedout, loggedin) => {
    const session = sessionStorage.getItem('loginUser')
    if (session != null) {
        await loggedout.forEach((doc) => {
            $(doc).css('display', 'none')
        })
        await loggedin.forEach((doc) => {
            $(doc).css('display', 'block')
        })
    } else {
        await loggedout.forEach((doc) => {
            $(doc).css('display', 'block')
        })
        await loggedin.forEach((doc) => {
            $(doc).css('display', 'none')
        })
    }
}