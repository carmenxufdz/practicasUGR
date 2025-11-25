<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include("database/db_portada.php");
    include("database/db_menu.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    $portada = getPortada();
    $menu = getMenu();
    echo $twig->render('index.html', ['portada' => $portada, 'menu'=> $menu]);
?>