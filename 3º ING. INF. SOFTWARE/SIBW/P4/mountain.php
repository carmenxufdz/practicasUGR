<?php
    session_start();
    
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include("database/db_usuario.php");
    include("database/db_mountain.php");
    include("database/db_menu.php");
    
    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    if (isset($_SESSION['nickUsuario'])){
        // aunque obtenemos todos los datos del usuario, al html solo le damos los que le interesan
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']) ;
    }
    else $usuario = 0;

    if (isset ($_GET['id'])){
        $id = $_GET['id'];
    } else {
        $id = -1;
    }
    $mountain = getMountain($id);
    $menu = getMenu();

    echo $twig->render('mountain.html', ['mountain' => $mountain, 'menu' => $menu, 'usuario'=>$usuario]);
?>