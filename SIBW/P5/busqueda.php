<?php
    include_once("database/db_actividad.php");
    include_once("database/db_usuario.php");

    session_start();
    if (isset($_SESSION['nickUsuario'])){
      $user = getUser($_SESSION['nickUsuario']);
      $usuario = array('nick' => $user['nick'], 'email'=>$user['email'], 'tipo' => $user['tipo']) ;
    } else $usuario = "Empty";

    if(isset($_POST['valor']) and !empty($_POST['valor'])){
        $res = searchActividadCompleta($_POST['valor'], $usuario) ;
        echo $res;
    }
    else{
        echo("Error");
    }
?>