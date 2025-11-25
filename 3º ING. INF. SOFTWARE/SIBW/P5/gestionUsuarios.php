<?php
require_once "/usr/local/lib/php/vendor/autoload.php";
require_once 'database/db_usuario.php';

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    session_start();
    if (isset($_SESSION['nickUsuario'])){
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']);
    } else header("Location: index.php");
    if($usuario['tipo'] != "Superusuario") 
        header("Location: index.php");


    $error = "Null";
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nuevotipo = $_POST['nuevotipo'];
        $nick = $_POST['nick'] ;            
        if(!modifyTipo($nick,$nuevotipo)){
            $error = "No tienes más de un Super. Deja uno al menos";
        }
    }   

        
    include("database/db_menu.php");
    $menu = getMenu();
    $listaUsuarios = getListaUsuarios($user['nick']);
    echo $twig->render('gestionUsuarios.html', ['usuario' => $usuario, 'usuarios' => $listaUsuarios, 'error' => $error, 'menu'=>$menu]);
?>