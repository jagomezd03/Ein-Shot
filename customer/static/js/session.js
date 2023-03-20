//Identificar los containers
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

//Overlay Panel Derecho
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

//Overlay Panel Izquierdo
signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});