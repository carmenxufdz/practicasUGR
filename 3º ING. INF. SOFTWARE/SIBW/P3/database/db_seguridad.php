<?php
    function compruebaId($Id){
        if(!is_numeric($Id)){
            die("Un evento es un numero");
        }
    }
?>