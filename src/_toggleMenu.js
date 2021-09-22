const toggleMenu = () => {
	document.getElementById('menu_btn').classList.toggle('opened');
	document.getElementById('mainNav').classList.toggle('opened');
};

const closeMenu = () => {
	document.getElementById('menu_btn').classList.remove('opened');
	document.getElementById('mainNav').classList.remove('opened');
};