//WRAPPER CAROUSEL NO TOCAR
const body = document.querySelector('body'),
    home = document.querySelector('.home'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    homeToggle = body.querySelector('#hola'),
    modeSwitch = body.querySelector(".toggle-switch"),
    sidebarid = document.querySelector('#sidebar'),
    modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    home.classList.toggle("nonclick");
})

homeToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    home.classList.toggle('nonclick');
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
let user = getCookie("user");
if (user == "") {
    $(window).on('load', function () {
        $('#modal').modal('show');
    });
}