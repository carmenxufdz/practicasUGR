<?php
    // En la sesion tengo guardado nickUsuario, y de ahi saco el usuario y su rol
    session_start();

    require_once "/usr/local/lib/php/vendor/autoload.php";
    include("database/db_portada.php");
    include("database/db_menu.php");
    include("database/db_usuario.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    if (isset($_SESSION['nickUsuario'])){
        // aunque obtenemos todos los datos del usuario, al html solo le damos los que le interesan
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']) ;
    }
    else $usuario = 0;

    $portada = getPortada();
    $menu = getMenu();
    echo $twig->render('index.html', ['portada' => $portada, 'menu'=> $menu, 'usuario'=> $usuario]);
?>