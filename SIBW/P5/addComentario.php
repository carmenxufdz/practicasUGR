<?php
// Funcion auxiliar para llamar a la base de datos
include_once("database/db_comentarios.php");
include_once("database/db_usuario.php");

session_start();
if (isset($_SESSION['nickUsuario'])){
    $user = getUser($_SESSION['nickUsuario']);
    $usuario = array('nick' => $user['nick'], 'email'=>$user['email'], 'tipo' => $user['tipo']) ;
  }



if (isset($_POST['comentario'])) {
    // Comprueba si el campo $_POST['comentario'] está vacío
    if (empty($_POST['comentario'])) {
        header("Location: actividad.php?id=" . $_POST['activityId']);
    } else {
        addComentario($_POST['id'], $user['nick'], $user['email'], $_POST['comentario']);
        header("Location: actividad.php?id=" . $_POST['activityId']);
    }
} else {
    echo "Error al subir el comentario";
}
?>