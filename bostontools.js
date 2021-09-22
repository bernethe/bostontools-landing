'use strict'; // var docid_rx, phone_rx, email_rx;
// docid_rx = new RegExp('^[0-9]{9,12}$');
// phone_rx = new RegExp('^[0-9]{8}$');
// email_rx = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');

var addEventListenerList = function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, !1);
  }
}; // const getScript = (source, callback) => {
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


var appendPreloader = function appendPreloader(pl_txt) {
  var pldiv = createCustomElement('div', {}, [createCustomElement('div', {
    'class': 'spinner_mc'
  }), createCustomElement('div', {
    'class': 'status_sp_txt'
  }, [pl_txt])]);
  var overall = createCustomElement('div', {
    'class': 'modal-pl'
  }, [pldiv]);
  document.body.appendChild(overall);
};

var removePreloader = function removePreloader(eRP) {
  if (eRP) {
    eRP.preventDefault();
  }

  document.body.removeChild(document.querySelector('.modal-pl'));
};

var appendModal = function appendModal() {
  var modalTxt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var modalTittle = arguments.length > 1 ? arguments[1] : undefined;
  var modalFooter = arguments.length > 2 ? arguments[2] : undefined;
  var modCont = new Array();

  if (modalTittle != undefined) {
    modCont.push(createCustomElement('div', {
      'class': 'modal_header'
    }, [createCustomElement('h3', {}, [modalTittle])]));
  }

  modCont.push(createCustomElement('div', {
    'class': 'modal_body'
  }, [modalTxt]));

  if (modalFooter != undefined) {
    modCont.push(createCustomElement('div', {
      'class': 'modal_footer'
    }, [modalFooter]));
  }

  modCont.push(createCustomElement('a', {
    'href': '#',
    'class': 'modal_close'
  }, ['×']));
  var mdl = createCustomElement('div', {
    'class': 'modalAll'
  }, modCont);
  var blk = createCustomElement('div', {
    'id': 'modalDialog'
  }, [mdl]);
  blk.addEventListener('click', function (e) {
    if (e.target === blk) {
      removeModal();
    }
  });
  document.body.appendChild(blk);
  document.querySelector('.modal_close').addEventListener('click', removeModal);
};

var removeModal = function removeModal(eRM) {
  if (eRM) {
    eRM.preventDefault();
  }

  document.body.removeChild(document.getElementById('modalDialog'));
};

var removeAllChilds = function removeAllChilds(myNode) {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
}; // https://github.com/escueladigital/EDui
// Crear elementos con atributos e hijo


var createCustomElement = function createCustomElement(element, attributes, children) {
  var customElement = document.createElement(element);
  if (children !== undefined) children.forEach(function (el) {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement, attributes);
  return customElement;
}; // Añadir un objeto de atributos a un elemento


var addAttributes = function addAttributes(element, attrObj) {
  for (var attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) {
      element.setAttribute(attr, attrObj[attr]);
    }
  }
};
"use strict";

var formEval = function formEval(e) {
  e.preventDefault();

  var _m = new Array();

  if (!validateInputText(document.getElementById('fname_txt'))) {
    _m.push('El <em>nombre</em> es requerido.');
  }

  if (!validateInputText(document.getElementById('lname_txt'))) {
    _m.push('El <em>apellido</em> es requerido.');
  }

  if (!validateInputEmail(document.getElementById('email_txt'))) {
    _m.push('El <em>correo electrónico</em> es requerido.');
  }

  if (!validateInputPhone(document.getElementById('phone_txt'))) {
    _m.push('El <em>teléfono</em> es requerido.');
  }

  if (!validateInputText(document.getElementById('comment_txt'))) {
    _m.push('El <em>comentario</em> es requerido.');
  }

  if (!validateCheckedCheckbox(document.getElementById('tyc_txt'))) {
    _m.push('Debe aceptar los <em>términos y condiciones</em>.');
  }

  if (_m.length == 0) {
    var _fd = new FormData(e.target);

    appendPreloader('Enviando info'); // document.querySelector('#promoForm button').classList.add('d-none');
    // document.querySelector('#promoForm .spinner').classList.remove('d-none');

    fetch(e.target.action, {
      method: e.target.method,
      body: _fd,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      e.target.reset(); // document.querySelector('#promoForm button[type="submit"]').classList.remove('d-none');
      // document.querySelector('#promoForm .spinner').classList.add('d-none');

      var emojiTitle;

      if (data.success) {
        emojiTitle = '✅ Listo';
      } else {
        emojiTitle = '❌ Atención';
      }

      removePreloader();
      appendModal(data.message, emojiTitle); // console.log(data);
    })["catch"](function (error) {
      console.log(error);
    });
  } else {
    var errMsj = '<p>Favor revisar los datos:</p> <ul>';

    for (var i = 0; i < _m.length; i++) {
      errMsj += "<li>" + _m[i] + "</li>";
    }

    errMsj += '</ul>';
    appendModal(errMsj, '⚠️ Atención');
  }
};

var validateInputText = function validateInputText(inp) {
  inp.value = trimInputValue(inp.value);
  return !(inp.value == '');
}; // const validateInputDocId = (inp) => {
// 	inp.value = trimInputValue(inp.value);
// 	const docid_rx = new RegExp('^[0-9]{9,12}$');
// 	return docid_rx.test(inp.value);
// };


var validateInputPhone = function validateInputPhone(inp) {
  inp.value = trimInputValue(inp.value);
  var phone_rx = new RegExp('^[0-9]{8}$');
  return phone_rx.test(inp.value);
};

var validateInputEmail = function validateInputEmail(inp) {
  inp.value = trimInputValue(inp.value);
  var email_rx = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  return email_rx.test(inp.value);
};

var validateCheckedCheckbox = function validateCheckedCheckbox(inp) {
  return inp.checked;
};

var trimInputValue = function trimInputValue(str) {
  return str.trim();
};
"use strict";

var toggleMenu = function toggleMenu() {
  document.getElementById('menu_btn').classList.toggle('opened');
  document.getElementById('mainNav').classList.toggle('opened');
};

var closeMenu = function closeMenu() {
  document.getElementById('menu_btn').classList.remove('opened');
  document.getElementById('mainNav').classList.remove('opened');
};
"use strict";

var tycShow = function tycShow(e) {
  e.preventDefault();
  appendModal('<p>El presente Política de Privacidad establece los términos en que Boston Tools, registrada como DISTRIBUIDORA SOGUE SYG LIMITADA, Cédula jurídica: 3-102-803350 utiliza y protege la información que es proporcionada por sus usuarios al momento llenar uno de los formularios de solicitud de información. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p> <h4>Información que es recogida</h4> <p>Al brindar su información: Nombre, información de contacto como su dirección de correo electrónico o teléfono. La información suministrada será con el fin de brindarle la información que usted solicite a nuestra empresa para adquirir alguno de nuestros servicios.</p> <h4>Uso de la información recogida</h4> <p>La información proporcionada se recibe con fin de brindarle el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios. Es posible que sean enviados correos electrónicos periódicamente con ofertas especiales, nuevos servicios y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.</p> <p>Boston Tools está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.</p> <h4>Control de su información personal</h4> <p>Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.</p> <p>Boston Tools se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.</p>', 'POLÍTICA DE PRIVACIDAD');
};
'use strict';

var main = function main() {
  // window.addEventListener('scroll', () => {
  // 	if(window.scrollY > 40) {
  // 		document.querySelector('.main-nav').classList.add('is-pinned');
  // 	} else {
  // 		document.querySelector('.main-nav').classList.remove('is-pinned');
  // 	}
  // }, !1);
  document.getElementById('menu_btn').addEventListener('click', toggleMenu, !1);
  addEventListenerList(document.querySelectorAll('nav.main-nav a'), 'click', closeMenu); // addEventListenerList(document.querySelectorAll('#proyectos a'), 'click', showBigPicture);

  document.getElementById('contactForm').addEventListener('submit', formEval, !1);
  document.getElementById('tyc_anchor').addEventListener('click', tycShow, !1);
  AOS.init();
};

document.addEventListener('DOMContentLoaded', main, !1);

//# sourceMappingURL=bostontools.js.map