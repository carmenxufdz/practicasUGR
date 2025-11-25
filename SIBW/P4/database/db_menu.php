
<?php
    include("db_config.php");

    function getMenu(){
        global $mysqli;

        $res = $mysqli->query("SELECT nombre FROM actividades") ;
        $menu = array();
        $menu_actividad = array() ;
        $menu_moutain = array() ;

        while($row = $res->fetch_assoc()){
            $actividad = array('actividad' => $row['nombre']); 
            array_push($menu_actividad,$actividad) ;
        }

        $res = $mysqli->query("SELECT nombre FROM mountains") ;

        while($row = $res->fetch_assoc()){
            $mountain = array('mountain' => $row['nombre']);
            array_push($menu_moutain,$mountain) ;
        }

        array_push($menu, $menu_actividad);
        array_push($menu, $menu_moutain);

        return $menu ;
    }
?>