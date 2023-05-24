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