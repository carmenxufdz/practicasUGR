<?php
    include("db_config.php");
    include_once("db_seguridad.php");

    
    function getActividad($id){
        global $mysqli;

        compruebaId($id);
        $res = $mysqli->query("SELECT nombre, precio, grupos, fecha, foto_portada, descripcion1, descripcion2 FROM actividades WHERE id=" . $id+1) ;
    
        if($res->num_rows > 0){
            $row = $res->fetch_assoc();
            $actividades = array(
                'id' => $id,
                'nombre' => $row['nombre'],
                'precio' => $row['precio'],
                'grupos' => $row['grupos'],
                'fecha' => $row['fecha'],
                'foto_portada' => $row['foto_portada'],
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

    function getListaActividades(){
        global $mysqli;

        $res = $mysqli->query("SELECT id, nombre, precio, grupos, fecha, foto_portada FROM actividades ORDER BY id") ;
        $lista = array() ;

        while($row = $res->fetch_assoc()){
            $actividad = array(
                'idActividad' => $row['id'],
                'nombre' => $row['nombre'],
                'precio' => $row['precio'],
                'grupos' => $row['grupos'],
                'fecha' => $row['fecha'],
                'foto_portada' => $row['foto_portada'] );
            array_push($lista,$actividad) ;
        }

        return $lista;
    }

     // Numero Actividad
     function getNumActividades(){
        global $mysqli;
        $res = $mysqli->query("SELECT nombre FROM actividades") ;
        return $res->num_rows;
    }

    // Añadimos Actividad
    function addActividad($id, $nombre, $precio, $grupos,
    $fecha, $foto_portada, $descripcion1, $descripcion2){
        global $mysqli;
        $mysqli->query("INSERT INTO actividades(id, nombre, precio, grupos, fecha, foto_portada, descripcion1, descripcion2) 
            Values ('$id','$nombre', '$precio', '$grupos', '$fecha', '$foto_portada', '$descripcion1', '$descripcion2')");
    }
    // Borramos Actividad
    function deleteActividad($id){
        global $mysqli;
        compruebaId($id);
        $mysqli->query("DELETE FROM actividades WHERE id='$id'");
        $mysqli->query("DELETE FROM imagenes WHERE idActividad='$id'");
    }


    // Modificamos Actividad
    function modifyActividad($id, $nombre, $precio, $grupos,
                                $fecha, $foto_portada, $descripcion1, $descripcion2){
        global $mysqli;
        compruebaId($id);
        if(isset($nombre)) $mysqli->query("UPDATE actividades SET nombre='$nombre' WHERE id=" . $id+1);
        if(isset($precio)) $mysqli->query("UPDATE actividades SET precio='$precio' WHERE id=" . $id+1);
        if(isset($grupos)) $mysqli->query("UPDATE actividades SET grupos='$grupos' WHERE id=" . $id+1);
        if(isset($fecha)) $mysqli->query("UPDATE actividades SET fecha='$fecha' WHERE id=" . $id+1);
        if(isset($foto_portada)) $mysqli->query("UPDATE actividades SET foto_portada='$foto_portada' WHERE id=" . $id+1);
        if(isset($descripcion1)) $mysqli->query("UPDATE actividades SET path_foto2='$descripcion1' WHERE id=" . $id+1);
        if(isset($descripcion2)) $mysqli->query("UPDATE actividades SET descripcion2='$descripcion2' WHERE id=" . $id+1);
    }

    function addImagenes($idActividad, $foto, $piefoto){
        global $mysqli;
        $mysqli->query("INSERT INTO imagenes(idActividad, foto, piefoto) 
            Values ('$idActividad', '$foto', '$piefoto')");
    }
?>