<?php
    include("db_config.php");
    
    function getPalabras(){
        global $mysqli;

        $res = $mysqli->query("SELECT palabra FROM prohibidas") ;
        $palabras = array() ;

        while($row = $res->fetch_assoc()){
            array_push($palabras,$row['palabra']);
        }

        return $palabras;
    }
?>