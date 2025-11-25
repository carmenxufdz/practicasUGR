<?php
    include("db_config.php");

    function getPortada(){
        global $mysqli;

        $res = $mysqli->query("SELECT nombre, foto_portada, id, publicado FROM actividades ORDER BY id") ;
        $portada = array() ;

        while($row = $res->fetch_assoc()){
            $actividad = array(
                'nombre' => $row['nombre'], 
                'foto_portada' => $row['foto_portada'],
                'id' => $row['id'],
                'publicado' => $row['publicado']
            );
            array_push($portada,$actividad) ;
        }

        return $portada ;
    }
?>