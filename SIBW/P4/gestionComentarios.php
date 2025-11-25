<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    require_once "database/db_comentarios.php";
    require_once 'database/db_usuario.php';


    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);
    
    session_start();
    if (isset($_SESSION['nickUsuario'])){
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']);
    } else $usuario = "Empty";
    if($usuario == "Empty")
        header("Location: index.php");
    if($usuario['tipo'] != "Moderador" and $usuario['tipo'] != "Superusuario") 
        header("Location: index.php");
        

    include("database/db_menu.php");

    $listaComentarios = getListaComentarios();
    $menu = getMenu();

    echo $twig->render('gestionComentarios.html', ['usuario' => $usuario, 'comentarios' => $listaComentarios, 'menu'=>$menu]);
?>