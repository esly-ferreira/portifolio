<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["fullname"];
    $email = $_POST["email"];
    $mensagem = $_POST["message"];

    $destinatario = "atendimento@esly.com.br"; 
    $assunto = "Nova mensagem do site";
    $corpoEmail = "Nome: $nome\nEmail: $email\nMensagem:\n$mensagem";
    $headers = "From: $email";

    if (mail($destinatario, $assunto, $corpoEmail, $headers)) {
        header("Location: obrigado.html"); // Redireciona para uma página de agradecimento
        exit();
    } else {
        header("Location: erro.html"); // Redireciona para uma página de erro
        exit();
    }
}
?>
