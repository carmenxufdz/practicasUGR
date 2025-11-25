<?php
    // Cerramos la sesion y vamos al inicio
    session_start();
    session_destroy();
    header("Location: index.php");
    exit();
?>