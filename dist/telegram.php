<?php

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
// $email = $_POST['user_email'];
$selectType = $_POST['user_select'];
$userMessage = $_POST['user_message'];
$token = "1675305298:AAFZP_TyfKqZhXb2UlXqeBN7GWOCQLxgXAw"; // http://joxi.ru/v295MB7tzM6g72 - при создании бота в BotFather дается токен
$chat_id = "803056459"; /* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates, где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее. http://joxi.ru/p27DqBgcWqBVXA - где потом взять chat_id */
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Тип фотосессии: ' => $selectType,
  'Сообщение: ' => $userMessage
);
// 'Email' => $email,

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  // header('Location: thank-you.html');
  $message = 'Данные отправлены';
} else {
  $message = 'Ошибка';
  // echo "Error";
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>