<?php
    include("db_config.php");

    function getPortada(){
        global $mysqli;

        $res = $mysqli->query("SELECT nombre, foto_portada FROM actividades") ;
        $portada = array() ;

        while($row = $res->fetch_assoc()){
            $actividad = array(
                'nombre' => $row['nombre'], 
                'foto_portada' => $row['foto_portada']);
            array_push($portada,$actividad) ;
        }

        return $portada ;
    }
?>