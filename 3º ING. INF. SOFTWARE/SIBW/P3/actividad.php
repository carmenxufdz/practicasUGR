<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include("database/db_actividad.php");
    include("database/db_comentarios.php");
    include("database/db_palabras.php");
    include("database/db_menu.php");
    
    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    if (isset ($_GET['ev'])){
        $id = $_GET['ev'];
    } else {
        $id = -1;
    }
    $actividad = getActividad($id);
    $comentarios = getComentarios($id);
    $prohibidas = getPalabras();
    $menu = getMenu();

    if(!isset($_GET['imp']) || ($_GET['imp']) != '1')
        echo $twig->render('actividad.html', ['actividad' => $actividad, 'menu' => $menu,
                    'comentarios' => $comentarios, 'prohibidas' => $prohibidas]);
    else
        echo $twig->render('actividad.html', ['actividad' => $actividad, 'menu' => $menu, 'imp' => 1]);
?>