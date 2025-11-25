//Variables globales a las que accederemos
var abrir=true
var cajaDesplegable=document.getElementById("desplegable");
var botonComentarios=document.getElementById("boton-comentario");
var zonaTextoNuevoComentario=document.getElementById("comentario-nuevo");
var botonSubmit=document.getElementById("submit")

//Funciones
//Funcion que comprueba mediante expresiones regulares si el formato del email es correcto y si no esta vacio
function comprobarEmail(email){
    if(email!="" && email.search(/^([0-9a-z\.\_]+)+@{1}([0-9a-z]+\.)+[0-9a-z]+$/i)!=-1)
        return true
    else
        return false
}

//Funcion que devuelve la fecha actual en formato mas legible
function obtenerFechaActual(){
    var fecha=new Date()
    var mesString;

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    mesString = meses[fecha.getMonth()];

    var dia=(fecha.getDate()<10)?"0"+fecha.getDate(): fecha.getDate();
    var minutos=(fecha.getMinutes()<10)?"0"+fecha.getMinutes(): fecha.getMinutes();
    var horas=(fecha.getHours()<10)?"0"+fecha.getHours():fecha.getHours();

    return dia+" de "+mesString+" de "+fecha.getFullYear()+", "+horas+":"+minutos;
}

//Funcion para abrir y cerrar la caja de los comentarios
function expandirComentarios(){
    if(abrir){
        cajaDesplegable.style.left="0"
        abrir=false;
    }
    else{
        cajaDesplegable.style.left="calc(-1 * min(600px, 55vw))"
        abrir=true;
    }
}

//Funcion que sirve para añadir un nuevo comentario
function subirComentario(){
    var nombre=document.getElementById("nombre")
    var email=document.getElementById("email")
    var comentarioNuevo=document.getElementById("comentario-nuevo")

    var comentarios=document.getElementsByClassName("comentario-container")
    // copio la estructura del comentario
    var template=comentarios[0].cloneNode(true)


    if(nombre.value!="" && comprobarEmail(email.value) && comentarioNuevo.value!=""){
        //Se inserta el nuevo comentario justo debajo del final de la caja para crear uno.
        filtroPalabras(); // Por si la ultima palabra es una palabrota
        //InnerHTML para crear un nuevo comentario
        template.innerHTML="<div class=\"nombre-comentario\">"+
                                nombre.value+
                            "</div>"+
                            "<div class=\"comentario-email\">"+
                                email.value+
                            "</div>"+
                            "<div class=\"fecha\">"+
                                obtenerFechaActual()+
                            "</div>"+
                            "<div class=\"contenido-comentario\">"+
                                comentarioNuevo.value+
                            "</div>";

        document.getElementById("caja-comentarios").insertBefore(template, comentarios[comentarios.length])
        nombre.value=email.value=comentarioNuevo.value="" // reseteo
    }
    else{
        alert("Uno o varios campos están vacíos o son inválidos")
    }
}

//Funcion que comprueba palabrotas de un array de strings
function filtroPalabras(){
    var texto=document.getElementById("comentario-nuevo");
    var palabras = document.getElementById('palabras_baneadas').innerHTML.split("-");

    // Filtramos las palabras de la siguiente forma: idiota => i*****
    palabras.forEach(
        (aux)=>{
            let regex = new RegExp(aux,"ig");
            texto.value = texto.value.replace(regex, (match) => {
                return match[0]+ "*".repeat(match.length - 1);
            });
        }
    )
}

// Los listener
botonComentarios.addEventListener("click", expandirComentarios);
botonSubmit.addEventListener("click", subirComentario);
zonaTextoNuevoComentario.addEventListener("keyup", filtroPalabras)