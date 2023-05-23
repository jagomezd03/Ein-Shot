import { validateEmail, validatePassword, getEmployeeSession } from "./firebase.js"
import { showMessage } from "./showmessage.js"

const sessionForm = document.getElementById('sessionForm')
let modal = ""

sessionForm.addEventListener('submit', async e => {
    e.preventDefault()
    const email = sessionForm['emailSession'].value
    const pass = sessionForm['pass'].value
    if (!(validateEmail(email))) {
        return false;
    } else if (!validatePassword(pass)) {
        return false;
    }
    //Try catch
    try {
        getEmployeeSession(email, pass)
        modal = bootstrap.Modal.getInstance(document.getElementById('modal'))
        modal.hide()
    } catch (error) {
        showMessage("Error", "error")
        console.log(error)
    }
})