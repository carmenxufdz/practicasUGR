<?php
    include("db_config.php");
    include_once("db_seguridad.php");

    
    function getActividad($id){
        global $mysqli;

        compruebaId($id);
        $res = $mysqli->query("SELECT nombre, precio, grupos, fecha, descripcion1, descripcion2 FROM actividades WHERE id=" . $id+1) ;
    
        if($res->num_rows > 0){
            $row = $res->fetch_assoc();
            $actividades = array(
                'id' => $id,
                'nombre' => $row['nombre'],
                'precio' => $row['precio'],
                'grupos' => $row['grupos'],
                'fecha' => $row['fecha'],
                'descripcion1' => $row['descripcion1'],
                'descripcion2' => $row['descripcion2']
            );
        }

        
        $res = $mysqli->query("SELECT foto, piefoto FROM imagenes WHERE idActividad=" . $id+1) ;
        $imagenes = array();
        while($row = $res->fetch_assoc()){
            $imagen = array(
                'idActividad' => $id,
                'foto' => $row['foto'],
                'piefoto' => $row['piefoto']
            );
            array_push($imagenes, $imagen);
        }

        $actividad = array(
            "actividades" => $actividades,
            "imagenes" => $imagenes
        );


        return $actividad;
    }
?>