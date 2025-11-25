<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include("database/db_mountain.php");
    include("database/db_menu.php");
    
    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    if (isset ($_GET['ev'])){
        $id = $_GET['ev'];
    } else {
        $id = -1;
    }
    $mountain = getMountain($id);
    $menu = getMenu();


    echo $twig->render('mountain.html', ['mountain' => $mountain, 'menu' => $menu]);
?>