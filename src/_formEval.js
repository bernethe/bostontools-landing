const formEval = (e) => {
    e.preventDefault();
    let _m = new Array();

	if( !validateInputText(document.getElementById('fname_txt')) ) {
		_m.push('El <em>nombre</em> es requerido.');
	}

	if( !validateInputText(document.getElementById('lname_txt')) ) {
		_m.push('El <em>apellido</em> es requerido.');
	}

	if( !validateInputEmail(document.getElementById('email_txt')) ) {
		_m.push('El <em>correo electrónico</em> es requerido.');
	}

	if( !validateInputPhone(document.getElementById('phone_txt')) ) {
		_m.push('El <em>teléfono</em> es requerido.');
	}

	if( !validateInputText(document.getElementById('comment_txt')) ) {
		_m.push('El <em>comentario</em> es requerido.');
	}

	if( !validateCheckedCheckbox(document.getElementById('tyc_txt')) ) {
		_m.push('Debe aceptar los <em>términos y condiciones</em>.');
	}
    
    if( _m.length == 0 ) {
		const _fd = new FormData(e.target);
        appendPreloader('Enviando info');
		// document.querySelector('#promoForm button').classList.add('d-none');
		// document.querySelector('#promoForm .spinner').classList.remove('d-none');
		fetch(e.target.action, {
			method: e.target.method,
			body: _fd,
			headers: {
				'Accept': 'application/json'
			}
		})
		.then( response => response.json() )
		.then( (data) => {
			e.target.reset();
			// document.querySelector('#promoForm button[type="submit"]').classList.remove('d-none');
			// document.querySelector('#promoForm .spinner').classList.add('d-none');

			let emojiTitle;

			if(data.success) {
				emojiTitle = '✅ Listo';
			} else {
				emojiTitle = '❌ Atención';
			}
			removePreloader();
			appendModal(data.message, emojiTitle);
			// console.log(data);
		} ).catch( (error) => {
			console.log(error);
		} );
	} else {
		let errMsj = '<p>Favor revisar los datos:</p> <ul>';
		for(let i = 0; i < _m.length; i++) {
			errMsj += "<li>"+_m[i]+"</li>";
		}
		errMsj += '</ul>';
		appendModal(errMsj, '⚠️ Atención');
	}
};

const validateInputText = (inp) => {
	inp.value = trimInputValue(inp.value);
	return !(inp.value == '');
};

// const validateInputDocId = (inp) => {
// 	inp.value = trimInputValue(inp.value);
// 	const docid_rx = new RegExp('^[0-9]{9,12}$');
// 	return docid_rx.test(inp.value);
// };

const validateInputPhone = (inp) => {
	inp.value = trimInputValue(inp.value);
	const phone_rx = new RegExp('^[0-9]{8}$');
	return phone_rx.test(inp.value);
};

const validateInputEmail = (inp) => {
	inp.value = trimInputValue(inp.value);
	const email_rx = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
	return email_rx.test(inp.value);
};
const validateCheckedCheckbox = (inp) => {
	return inp.checked;
};
const trimInputValue = (str) => {
	return str.trim();
};