<?php

    session_start();

    require_once "/usr/local/lib/php/vendor/autoload.php";
    include("database/db_usuario.php");
    include("database/db_actividad.php");
    include("database/db_comentarios.php");
    include("database/db_palabras.php");
    include("database/db_menu.php");

    
    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    if (isset($_SESSION['nickUsuario'])){
        // aunque obtenemos todos los datos del usuario, al html solo le damos los que le interesan
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'email'=>$user['email'], 'tipo' => $user['tipo']) ;
    }
    else $usuario = 0;


    if (isset ($_GET['id'])){
        $id = $_GET['id'];
    } else {
        $id = -1;
    }
    
    $actividad = getActividad($id);
    $comentarios = getComentarios($id);
    $prohibidas = getPalabras();
    $menu = getMenu();

    if(!isset($_GET['imp']) || ($_GET['imp']) != '1')
        echo $twig->render('actividad.html', ['actividad' => $actividad, 'menu' => $menu,
                    'comentarios' => $comentarios, 'prohibidas' => $prohibidas, 'usuario'=> $usuario, 'id' => $id]);
    else
        echo $twig->render('actividad.html', ['actividad' => $actividad, 'menu' => $menu,
        'comentarios' => $comentarios, 'prohibidas' => $prohibidas, 'usuario'=> $usuario, 'imp' => 1, 'id' => $id]);
?>