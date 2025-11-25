<?php
    include("db_config.php");
    include_once("db_seguridad.php");

    
    function getMountain($id){
        global $mysqli;

        compruebaId($id);
        $res = $mysqli->query("SELECT nombre, altura, foto, piefoto, descripcion1, descripcion2 FROM mountains WHERE id=" . $id+1) ;
        if($res->num_rows > 0){
            $row = $res->fetch_assoc();
            $moutain = array(
                'id' => $id,
                'nombre' => $row['nombre'],
                'altura' => $row['altura'],
                'foto' => $row['foto'],
                'piefoto' => $row['piefoto'],
                'descripcion1' => $row['descripcion1'],
                'descripcion2' => $row['descripcion2']
            );
        }

        return $moutain;
    }
?>