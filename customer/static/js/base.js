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

function clearInput(){
	var getName = document.getElementById("name")
	if(getName.value != ""){
		getName.value=""
	}
	var getSurname = document.getElementById("surname")
	if(getSurname.value !=""){
		getSurname.value=""
	}
	var getDocument = document.getElementById("doc")
	if(getDocument.value != ""){
		getDocument.value=""
	}
	var getTel = document.getElementById("tel")
	if(getTel.value != ""){
		getTel.value=""
	}
	var getPassword = document.getElementById("password")
	if(getPassword.value != ""){
		getPassword.value=""
	}
	var getEmail = document.getElementById("email")
	if(getEmail.value != ""){
		getEmail.value=""
	}
}