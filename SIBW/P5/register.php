<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    require_once 'database/db_usuario.php';


    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);
    
    $error = 0;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nick = $_POST['nick'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];

        if (registrar($nick, $email, $pass)) {
            session_start();
            $_SESSION['nickUsuario'] = $nick;  // guardo en la sesión el nick del usuario que se ha registrado
        }
        // Si el registro es efectivo, nos vamos a la portada
        if(isset($_SESSION['nickUsuario']))
            header("Location: index.php");
        else 
            $error = 1 ;
    }

    include("database/db_menu.php");

    $menu = getMenu();
    echo $twig->render('register.html', ['error' => $error,'usuario' => 0, 'menu'=> $menu]);
?>