<?php
require_once "/usr/local/lib/php/vendor/autoload.php";
require_once 'database/db_usuario.php';
require_once "database/db_actividad.php";
require_once "database/db_imagenes.php";

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    session_start();
    if (isset($_SESSION['nickUsuario'])){
      $user = getUser($_SESSION['nickUsuario']);
      $usuario = array('nick' => $user['nick'], 'tipo' => $user['tipo']) ;
    } else header("Location: index.php");

    if( !$usuario['tipo']==("Gestor") && !$usuario['tipo']==("Superusuario") ) 
        header("Location: gestionCientificos.php");

    $archivos = array();
    $errors= array();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if(isset($_FILES['path_foto1']) && isset($_FILES['path_foto2'])){
            $archivos[0] = addImagen($_FILES['path_foto1']);
            $archivos[1] = addImagen($_FILES['path_foto2']);
            $archivos[2] = addImagen($_FILES['foto_portada']);
            $nombre=$_POST['nombre'];
            $fecha=$_POST['fecha'];
            $precio=$_POST['precio'];
            $descripcion1=$_POST['descripcion1'];
            $descripcion2=$_POST['descripcion2'];
            $grupos=$_POST['grupos'];

            $fotos = array();

            if(isset($archivos[0]) and $archivos[0]!=false){
                $foto = array(
                    'foto' => $archivos[0],
                    'piefoto' => $_POST['pie_foto1']
                );
                array_push($fotos,$foto);
            }
            if(isset($archivos[1]) and $archivos[1] != false){
                $foto = array(
                    'foto' => $archivos[1],
                    'piefoto' => $_POST['pie_foto2']
                );
                array_push($fotos,$foto);
            }

            if(isset($archivos[2]) and $archivos[2] != false){
                $foto_portada = $archivos[2];
            }
            else{
                $foto_portada=null;
            }
            $idActividad = getNumActividades()+1;

            addActividad($idActividad, $nombre,$precio,$grupos,$fecha,
                $foto_portada,$descripcion1,$descripcion2);



            foreach ($fotos as $foto) {
                addImagenes($idActividad, $foto['foto'], $foto['piefoto']);
            }

            if(empty($errors)){
                header("Location: index.php");
            }
        }
    }

            
    include("database/db_menu.php");
    $menu = getMenu();

    echo $twig->render('addActividad.html', ['usuario' => $usuario, 'errores'=> $errors, 'menu' => $menu]);
?>