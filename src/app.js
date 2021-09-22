'use strict';

const main = () => {
	// window.addEventListener('scroll', () => {
	// 	if(window.scrollY > 40) {
	// 		document.querySelector('.main-nav').classList.add('is-pinned');
	// 	} else {
	// 		document.querySelector('.main-nav').classList.remove('is-pinned');
	// 	}
	// }, !1);

	document.getElementById('menu_btn').addEventListener('click', toggleMenu, !1);

	addEventListenerList(document.querySelectorAll('nav.main-nav a'), 'click', closeMenu);

	// addEventListenerList(document.querySelectorAll('#proyectos a'), 'click', showBigPicture);

	document.getElementById('contactForm').addEventListener('submit', formEval, !1);

	document.getElementById('tyc_anchor').addEventListener('click', tycShow, !1);

	AOS.init();
};

document.addEventListener('DOMContentLoaded', main, !1);
