
function peticionBusquedaAjax(){
    removeSearches();
    var valor = $("#busqueda").val(); // tomamos lo escrito
    //console.log(valor + "--" + valor.length);
    if(valor.length != 0){
        $.ajax({
            data:{valor},
            url:'busqueda.php',
            type:'post',
            beforeSend:function(){
                document.getElementById("resultados").style.display = "block"; 
            },
            success:function(respuesta){
                //console.log(respuesta);
                decodificarJSON(JSON.parse(respuesta)); 
            }
        })
    }
    else // Si borramos, desaparece el "Resultados:"
        document.getElementById("resultados").style.display = "none"; 
}

function decodificarJSON(json){
    // Hago la lista y la añado
    for (i = 0 ; i < json.actividades.length ; i++){
        var a = document.createElement("div");
        a.setAttribute('class','respuesta'); // Se usa abajo para borrar las respuestas
        var b = document.createElement("a");
        if(json.actividades[i].publicado == 1){
            b.href="actividad.php?id=" + json.actividades[i].id ;
        }
        else{
            if(json.usuario.tipo == 'Superusuario' || json.usuario.tipo == 'Gestor'){
                b.href="editarActividad.php?id=" + json.actividades[i].id ;
            } else {
                // No permitimos acceso a actividades no publicadas para usuarios no autorizados
                continue;
            }
        }
        b.innerHTML = json.actividades[i].nombre;
        a.appendChild(b);
        document.getElementById("resultados").appendChild(a);
    }
}

function removeSearches(){
    // Esto obtiene todos los elementos marcados y los borra 
    // para que no se acumulen en cada "nueva busqueda" con cada letra tecleada
    var queries = Array.prototype.slice.call(document.getElementsByClassName("respuesta")) ;

    for(query of queries){
        //console.log(query);
        query.remove();
    }
}