<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    require "database/db_actividad.php";
    require_once 'database/db_usuario.php';
    require_once 'database/db_imagenes.php';

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    session_start();
    if (isset($_SESSION['nickUsuario'])){
        $user = getUser($_SESSION['nickUsuario']);
        $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']) ;
    } else header("Location: index.php");
    
    if( $usuario['tipo']!="Gestor" && $usuario['tipo']!="Superusuario" )
        header("Location: index.php");

        if (isset ($_GET['id'])){
            $id = $_GET['id'];
        } else {
            header("Location: gestionActividades.php");
        }


    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(isset($_FILES['foto_portada'])){
            $idActividad = $_POST['idActividad'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $grupos = $_POST['grupos'];
            $fecha = $_POST['fecha'];
            $foto_portada = addImagen($_FILES['foto_portada']);
            $descripcion1 = $_POST['descripcion1'];
            $descripcion2 = $_POST['descripcion2'];
            $publicado = $_POST['publicado'];

            modifyActividad($idActividad, $nombre, $precio, $grupos, $fecha, $foto_portada, 
                                $descripcion1, $descripcion2, $publicado);
        }
                       
    }

    include("database/db_menu.php");
    $menu = getMenu();


    $actividad = getActividad($id);
    echo $twig->render('editarActividad.html', ['usuario' => $usuario,'actividad' => $actividad, 'menu'=> $menu]);
?>