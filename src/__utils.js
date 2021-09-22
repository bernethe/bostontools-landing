'use strict';
// var docid_rx, phone_rx, email_rx;
// docid_rx = new RegExp('^[0-9]{9,12}$');
// phone_rx = new RegExp('^[0-9]{8}$');
// email_rx = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');

const addEventListenerList = (list, event, fn) => {
	for (var i = 0, len = list.length; i < len; i++) {
		list[i].addEventListener(event, fn, !1);
	}
};

// const getScript = (source, callback) => {
// 	var script = document.createElement('script');
// 	var prior = document.getElementsByTagName('script')[0];
// 	script.async = 1;

// 	script.onload = script.onreadystatechange = function (_, isAbort) {
// 		if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
// 			script.onload = script.onreadystatechange = null;
// 			script = undefined;

// 			if (!isAbort) { if (callback) callback(); }
// 		}
// 	};

// 	script.src = source;
// 	prior.parentNode.insertBefore(script, prior);
// };

const appendPreloader = (pl_txt) => {
	let pldiv = createCustomElement('div',{},[
		createCustomElement('div',{'class':'spinner_mc'}),
		createCustomElement('div',{'class':'status_sp_txt'},[pl_txt])
	]);
	let overall = createCustomElement('div',{'class':'modal-pl'},[pldiv]);
	document.body.appendChild(overall);
}
const removePreloader = (eRP) => {
	if(eRP) {
		eRP.preventDefault();
	}
	document.body.removeChild(document.querySelector('.modal-pl'));
}
const appendModal = (modalTxt = '', modalTittle, modalFooter) => {
	let modCont = new Array();
	if(modalTittle != undefined) {
		modCont.push( createCustomElement('div',{'class':'modal_header'},[ createCustomElement('h3',{},[modalTittle]) ]) );
	}
	modCont.push( createCustomElement('div',{'class':'modal_body'},[modalTxt]) );
	if(modalFooter != undefined) {
		modCont.push( createCustomElement('div',{'class':'modal_footer'},[modalFooter]) );
	}
	modCont.push( createCustomElement('a',{'href':'#','class':'modal_close'},['×']) );
	let mdl = createCustomElement('div',{'class':'modalAll'},modCont);
	let blk = createCustomElement('div',{'id':'modalDialog'},[mdl]);
	blk.addEventListener('click', e => {
		if(e.target === blk) {
			removeModal();
		}
	});
	document.body.appendChild(blk);
	document.querySelector('.modal_close').addEventListener('click',removeModal);
}
const removeModal = (eRM) => {
	if(eRM) {
		eRM.preventDefault();
	}
	document.body.removeChild(document.getElementById('modalDialog'));
}
const removeAllChilds = (myNode) => {
	while (myNode.firstChild) {
		myNode.removeChild(myNode.lastChild);
	}
}
// https://github.com/escueladigital/EDui
// Crear elementos con atributos e hijo
const createCustomElement = (element,attributes,children) => {
	let customElement = document.createElement(element);
	if (children !== undefined) children.forEach(el => {
		if (el.nodeType) {
			if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
		} else {
			customElement.innerHTML += el;
		}
	});
	addAttributes(customElement,attributes);
	return customElement;
};

// Añadir un objeto de atributos a un elemento
const addAttributes = (element, attrObj) => {
	for (let attr in attrObj) {
		if (attrObj.hasOwnProperty(attr)) {
			element.setAttribute(attr,attrObj[attr]);
		}
	}
};