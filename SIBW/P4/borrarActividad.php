<?php
    include_once("database/db_usuario.php");
    include_once("database/db_actividad.php");

    session_start();
    if (isset($_SESSION['nickUsuario'])){
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']) ;
    } else header("Location: index.php");
    if($usuario['tipo'] !="Gestor" and $usuario['tipo'] != "Superusuario") 
        header("Location: index.php");

    if($_POST['id']){
        deleteActividad($_POST['id']);
        header("Location: gestionActividades.php");
    }
?>