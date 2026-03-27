<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

$name = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);

$to = "ronikauppinen01@gmail.com";
$subject = "Website Contact";

$body = "Name: $name\n";
$body .= "Email: $email\n\n";
$body .= "Message:\n$message";

$headers = "From: $email";

mail($to,$subject,$body,$headers);

header("Location: index.html?sent=true");
exit;

}

?>