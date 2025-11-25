<?php
require_once "/usr/local/lib/php/vendor/autoload.php";

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);
 
require_once 'database/db_usuario.php';

$error = 0;
session_start();
if (isset($_SESSION['nickUsuario'])){
    $user = getUser($_SESSION['nickUsuario']);
    $usuario = array('nick' => $user['nick'], 'email'=>$user['email'], 'tipo' => $user['tipo']) ;
} else $usuario = "Empty";
if($usuario == "Empty") 
    header("Location: index.php");
// Aqui nunca debería poder acceder un usuario no registrado

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if( empty($_POST['newnick']) || empty($_POST['newemail']) || empty($_POST['newpass']) ){
        $error = 1;
    } else {
        $nickAntiguo = $_SESSION['nickUsuario'];

        if(checkLogin($nickAntiguo, $_POST['pass'])){
            modifyUser($nickAntiguo,$_POST['newnick'],$_POST['newemail'],$_POST['newpass']);
            // Si modificamos, volvemos a coger los datos del usuario ahora modificados
            $_SESSION['nickUsuario'] = $_POST['newnick'];
            $user = getUser($_SESSION['nickUsuario']);
            $usuario = array('nick' => $user['nick'], 'email'=>$user['email'], 'tipo' => $user['tipo']) ;
        }
        else $error = 2;

    }
}

include("database/db_menu.php");
$menu = getMenu();

echo $twig->render('perfil.html', ['error' => $error, 'usuario' => $usuario, 'menu' => $menu]);
?>