<?php
    include("db_config.php");
    include_once("db_seguridad.php");

    function getComentarios($id){
        global $mysqli;

        compruebaId($id);    
        $res = $mysqli->query("SELECT nombre, email, fecha, comentario FROM comentarios WHERE idActividad=" . $id + 1) ;
        $comentarios = array() ;

        while($row = $res->fetch_assoc()){
            $comentario = array(
                'idCientifico' => $id,
                'nombre' => $row['nombre'], 
                'fecha' => $row['fecha'], 
                'email' => $row['email'],
                'comentario' => $row['comentario']);
            array_push($comentarios,$comentario) ;
        }

        return $comentarios ;
    }
?>