<?php

header('Content-Type: application/json');

// header('Content-Type: text/plain');

include_once('phpmailer/PHPMailer.php');
use PHPMailer\PHPMailer\PHPMailer;

if( isset($_REQUEST['fname_txt']) && isset($_REQUEST['lname_txt']) && isset($_REQUEST['email_txt']) && isset($_REQUEST['phone_txt']) && isset($_REQUEST['comment_txt']) && isset($_REQUEST['tyc_txt']) ) {


	$_subject = 'Contacto web BostonTools - '.$_REQUEST['fname_txt'];

	$_msj = '<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>'.$_subject.'</title>
</head>
<body style="margin: 10px;">
<div style="max-width:640px;background-color: #fff;border:1px solid #999;padding:10px;box-sizing:border-box; font-family: Arial, Helvetica, sans-serif; font-size: 11px; margin: auto;">
<p style="text-align:center"><img src="http://www.constructoratreehaus.com/img/logo.png" alt="treehaus" width="256" height="99"></p>
<p>Ha recibido un contacto del formulario web de constructoratreehaus.com, el dia '.strftime("%A %d de %B de %Y a las %H:%M %p").'.</p>';

	$_msj .= '<p><strong style="color:#999;">Nombre:</strong><br>'.$_REQUEST['fname_txt'].'</p>';
	$_msj .= '<p><strong style="color:#999;">Apellidos:</strong><br>'.$_REQUEST['lname_txt'].'</p>';
	$_msj .= '<p><strong style="color:#999;">Teléfono:</strong><br><a href="tel:'.$_REQUEST['phone_txt'].'">'.$_REQUEST['phone_txt'].'</a></p>';
	$_msj .= '<p><strong style="color:#999;">Correo Electrónico:</strong><br><a href="mailto:'.$_REQUEST['email_txt'].'">'.$_REQUEST['email_txt'].'</a></p>';
	$_msj .= '<p><strong style="color:#999;">Comentario:</strong><br>'.nl2br($_REQUEST['comment_txt']).'</p>';

	$_msj .= '</div>
</body>
</html>';

	$mail = new PHPMailer;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->setFrom('noreply@constructoratreehaus.com', 'No Reply');
	$mail->addReplyTo($_REQUEST['email_txt'], $_REQUEST['fname_txt']);
	// $mail->setFrom($_REQUEST['email_txt'], $_REQUEST['fname_txt']);
	$mail->addAddress('servicioalcliente@bostontoolscr.com', 'Info BostonTools');
	$mail->addBcc('katherine@metanoiacr.com', 'Katherine Zamora');
	$mail->addBcc('bernethe@gmail.com', 'Harold Soto');
	$mail->Subject = $_subject;
	//Read an HTML message body from an external file, convert referenced images to embedded,
	//convert HTML into a basic plain-text alternative body
	$mail->IsHTML(true);
	$mail->Body = $_msj;
	//send the message, check for errors
	$mail->send();

	echo '{"success":true,"message":"Ya se han enviado los datos, pronto estaremos en contacto.","data":'.json_encode($_REQUEST).'}';

	$sthSearchUser->closeCursor();
	$conn = null;

} else {
	echo '{"success":false,"message":"Los datos enviados están incompletos.","data":{}}';
}

?>