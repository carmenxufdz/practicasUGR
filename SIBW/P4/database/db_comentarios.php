<?php
    include_once("db_actividad.php");
    include_once("db_config.php");
    include_once("db_seguridad.php");

    function getComentarios($id){
        global $mysqli;

        compruebaId($id);    
        $res = $mysqli->query("SELECT nombre, email, fecha, comentario FROM comentarios WHERE idActividad=" . $id+1) ;
        $comentarios = array() ;

        while($row = $res->fetch_assoc()){
            $comentario = array(
                'idActividad' => $id,
                'nombre' => $row['nombre'], 
                'fecha' => $row['fecha'], 
                'email' => $row['email'],
                'comentario' => $row['comentario']);
            array_push($comentarios,$comentario) ;
        }

        return $comentarios ;
    }

    function addComentario($id, $nombre,$email, $comentario){
        global $mysqli;
        compruebaId($id);
        $mysqli->query("INSERT INTO `comentarios`(`idActividad`, `nombre`,`email`, `comentario`) 
            VALUES ('$id'+1,'$nombre','$email','$comentario')" );
    }

    // Obtenemos la lista completa de todos los comentarios
    function getListaComentarios(){
        global $mysqli;

        $res = $mysqli->query("SELECT id, idActividad, nombre, fecha, comentario 
            FROM comentarios") ;
        $lista = getListaActividades();
        $actividades = array();
        // En "Actividads" asocio cada nombre a su ID
        for($i = 0 ; $i<count($lista) ; $i++){
            $nombre = $lista[$i]['nombre'];
            $actividades[$lista[$i]['idActividad']] = $nombre;
        }

        $comentarios = array() ;
        while($row = $res->fetch_assoc()){
            $comentario = array(
                'id' => $row['id'], 
                'idActividad' => $row['idActividad'], 
                'nombreActividad' => $actividades[$row['idActividad']],
                'nick' => $row['nombre'], 
                'fecha' => $row['fecha'],
                'comentario' => $row['comentario']) ;
            array_push($comentarios,$comentario) ;
        }

        return $comentarios;
    }

    // Borramos un comentario
    function deleteComentario($id){
        global $mysqli;
        compruebaId($id);
        $mysqli->query("DELETE FROM comentarios WHERE id='$id'");
    }

    // Me traigo un comentario
    function getUnComentario($id){
        global $mysqli;
        compruebaId($id);
        $resultado = $mysqli->query("SELECT id, idActividad, nombre, fecha, comentario
        FROM comentarios WHERE id='$id'") ;
        $comentario = $resultado->fetch_assoc();
        return $comentario;
    }

    // Modificamos un comentario
    function modifyComentario($id,$contenido){
        global $mysqli;
        $mysqli -> query("UPDATE `comentarios` SET `comentario` = '$contenido' 
        WHERE `comentarios`.`id` = $id");
    }
?>