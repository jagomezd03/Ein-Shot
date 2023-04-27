import { showMessage } from "./showmessage.js";

(function ($) {
	"use strict";
	var fullHeight = function () {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});
})(jQuery);

const s = sessionStorage.getItem('login')
if (s == null) {
	$(window).on('load', function () {
		$('#modal').modal('show');
	});
}
const logout = document.getElementById('logoutButton')
logout.addEventListener('click', async () => {
	if (s != null) {
		sessionStorage.removeItem('login')
		showMessage("Sesion Cerrada", "error")
		setTimeout(() => {
			location.reload()
		}, 1000);
	}
})

function clearInput() {
	var getName = document.getElementById("name")
	if (getName.value != "") {
		getName.value = ""
	}
	var getSurname = document.getElementById("surname")
	if (getSurname.value != "") {
		getSurname.value = ""
	}
	var getDocument = document.getElementById("doc")
	if (getDocument.value != "") {
		getDocument.value = ""
	}
	var getTel = document.getElementById("tel")
	if (getTel.value != "") {
		getTel.value = ""
	}
	var getPassword = document.getElementById("password")
	if (getPassword.value != "") {
		getPassword.value = ""
	}
	var getEmail = document.getElementById("email")
	if (getEmail.value != "") {
		getEmail.value = ""
	}
}