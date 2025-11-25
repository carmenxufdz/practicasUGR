<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    require_once "database/db_actividad.php" ;
    require_once 'database/db_usuario.php';

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);
  
    session_start();
    if (isset($_SESSION['nickUsuario'])){
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']) ;
    } else $usuario = "Empty";
    if($usuario == "Empty")
        header("Location: index.php");
    if( $usuario['tipo']!=("Gestor") && $usuario['tipo']!=("Superusuario") ) 
        header("Location: index.php");

    $listaActividad = getListaActividades();

            
    include("database/db_menu.php");
    $menu = getMenu();

    echo $twig->render('gestionActividades.html', ['usuario' => $usuario, 'listaActividad' => $listaActividad, 'menu' =>$menu]);
?>