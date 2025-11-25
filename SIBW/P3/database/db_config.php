<?php
    $mysqli = new mysqli("database","alissea","270903","SIBW");
    if ($mysqli->connect_errno){
        echo ("Fallo al conectar " . $mysqli->connect_error);
    }

    if (!$mysqli->set_charset("utf8")) {
        echo "Error al establecer el conjunto de caracteres UTF-8: " . $mysqli->error;
        // Terminar el script o manejar el error de otra manera según sea necesario
    }
?>