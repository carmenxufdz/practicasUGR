<?php
    include("db_config.php");
    include_once("db_seguridad.php");

    
    function getActividad($id){
        global $mysqli;

        compruebaId($id);
        $res = $mysqli->query("SELECT nombre, precio, grupos, fecha, foto_portada, descripcion1, descripcion2, publicado FROM actividades WHERE id>=" . $id) ;
    
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
                'descripcion2' => $row['descripcion2'],
                'publicado' => $row['publicado']
            );
        }

        $res = $mysqli->query("SELECT foto, piefoto FROM imagenes WHERE idActividad=" . $id) ;
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

    function getIdActividad($id){
        global $mysqli;

        $res = $mysqli->query("SELECT id FROM actividades WHERE publicado=1 ORDER BY id LIMIT 1 OFFSET $id") ;

        if($res->num_rows > 0){
            $row = $res->fetch_assoc();
            $idActividad = $row['id'];
        }

        return $idActividad - 1;

    }

    function getListaActividades(){
        global $mysqli;

        $res = $mysqli->query("SELECT id, nombre, precio, grupos, fecha, foto_portada, publicado FROM actividades ORDER BY id") ;
        $lista = array() ;

        while($row = $res->fetch_assoc()){
            $actividad = array(
                'idActividad' => $row['id'],
                'nombre' => $row['nombre'],
                'precio' => $row['precio'],
                'grupos' => $row['grupos'],
                'fecha' => $row['fecha'],
                'foto_portada' => $row['foto_portada'],
                'publicado' => $row['publicado']
            );
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

    function getNumImagenes(){
        global $mysqli;
        $res = $mysqli->query("SELECT id FROM imagenes") ;
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
    function modifyActividad($id, $nombre, $precio, $grupos, $fecha, $foto_portada, 
                            $descripcion1, $descripcion2, $publicado){
        global $mysqli;
        compruebaId($id);
        if(isset($nombre)) $mysqli->query("UPDATE actividades SET nombre='$nombre' WHERE id=" . $id);
        if(isset($precio)) $mysqli->query("UPDATE actividades SET precio='$precio' WHERE id=" . $id);
        if(isset($grupos)) $mysqli->query("UPDATE actividades SET grupos='$grupos' WHERE id=" . $id);
        if(isset($fecha)) $mysqli->query("UPDATE actividades SET fecha='$fecha' WHERE id=" . $id);
        if(isset($foto_portada)) $mysqli->query("UPDATE actividades SET foto_portada='$foto_portada' WHERE id=" . $id);
        if(isset($descripcion1)) $mysqli->query("UPDATE actividades SET descripcion1='$descripcion1' WHERE id=" . $id);
        if(isset($descripcion2)) $mysqli->query("UPDATE actividades SET descripcion2='$descripcion2' WHERE id=" . $id);
        if(isset($publicado) && ($publicado == 0 || $publicado == 1)) {
            $result = $mysqli->query("UPDATE actividades SET publicado=" . (int)$publicado . " WHERE id=" . $id);
            if (!$result) {
                var_dump($mysqli->error);
            }
        }
    }

    function addImagenes($idActividad, $foto, $piefoto){
        global $mysqli;
        $mysqli->query("INSERT INTO imagenes(idActividad, foto, piefoto) 
            Values ('$idActividad', '$foto', '$piefoto')");
    }

    // Buscamos los cientificos cuyo nombre coincide
    function searchActividadCompleta($valor, $usuario){
        global $mysqli;
        $mysqli->real_escape_string($valor); //Limpiamos los caracteres problematicos
        $actividades = array();
    
        $resultado = $mysqli->query(" SELECT id, nombre, publicado FROM actividades 
            WHERE nombre LIKE '%$valor%' ") or die("???");
    
        while($row = $resultado->fetch_assoc()){
            $datos = array('id' => $row['id'] - 1, 'nombre' => $row['nombre'], 'publicado' => $row['publicado']);
            array_push($actividades,$datos);
        }

        $datos = array(
            'actividades' => $actividades,
            'usuario' => $usuario
        );
    
        return json_encode($datos);
    }

?>