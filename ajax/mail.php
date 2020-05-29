<?php

$to = '<enebra.org@gmail.com>, ';
//$to .= 'freeedua@gmail.com ';
//$to .= 'oleh.chernyuk@gmail.com ';

$subject = 'Закупка БДА комплекса';

$packs = $_POST["packs"];
$sum = trim($_POST["sum"]);
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$label = trim($_POST["label"]);

$res_packs = '';
$list_packs = '';
$res_name = '';
$res_phone = '';
$res ='';
$error = false;
$kids = [];
$money ='';

if (count($packs) < 1) {
	$res_packs .= 'Нет выбранного комплекса';
	$error = true;
}

if ( empty($name) ) {
	$res_name .= 'Поле имя - не заполнено';
	$error = true;
} else {
	$name_pattern = '/^([а-яё\s]+|[a-z\s]+)$/iu';
	if ( ! preg_match($name_pattern, $name) ) {
		$res_name .= 'Поле имя - должно состоять только из букв';
		$error = true;
	}
}

if ( empty($phone) ) {
	$res_phone .= 'Поле телефон - не заполнено';
	$error = true;
} else {
	$phone_pattern = '/^((8|\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/';
	if ( ! preg_match($phone_pattern, $phone) ) {
		$res_phone .= 'Поле телефон - не соответствует формату';
		$error = true;
	}
}

foreach ($packs as $pack) {
	if ($pack === 'checkFull') {
		$kids[] = 'Полный комплекс';
	} elseif ($pack === 'checkMeddle') {
		$kids[] = 'Средний комплекс';
	} else {
		$kids[] = 'Базовый комплекс';
	}
}

$list_packs = implode( ", ", $kids );
$money = substr($sum, 0, -1);

if ( !$error ) {
	$message = "<p>Заказ комплекта биологически активных добавок </p> </br> 
 				<p>Для:<b> $name </b><i>Телефонный номер: <b>$phone</b> </i></p> </br>
 				<p>Заказаны комплексы: <b>$list_packs </b></p> </br>
 				<p>На сумму: <b>$money грн </b></p> </br>
				<p></br>Заказ создан в <b>$label</b> форме</br></p>";

	$headers = "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From: Lending Page SmartMed <suport@fitoliniya.com>\r\n";
	$headers .= "Reply-To: order@fitoliniya.com\r\n";
//	$headers .= "Cc: sergeyvegas1972@gmail.com\r\n";

	if (mail($to, $subject, $message, $headers)) {
		$res = 'Сообщение отправлено, спасибо за заявку!';
	} else {
		$res = "Ошибка при отправке!\r\nПроверьте соединение с сетью и\r\nпопробуйте отправить повторно";
	}
}
echo $res_packs.'&'.$res_name.'&'.$res_phone.'&'.$res;

