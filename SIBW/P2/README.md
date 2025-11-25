# Práctica 2: Javascript

## Descripción de la Práctica
El objetivo de esta práctica es el diseño de un espacio para comentarios que los usuarios del sitio pueden hacer asociados a cada uno de las actividades mostradas en el sitio. Debe tener la siguiente funcionalidad:
* El panel de comentarios debe estar oculto en un lateral, y desplegarse al pulsar un botón
* Cuando se despliegue, deberá contar con dos comentarios predefinidos (como si hubieran sido introducidos por usuarios anteriores)
* Cada comentario tendrá autor, fecha y hora del comentario y texto del comentario
* Habrá un formulario con los siguientes campos:
    - Nombre
    - Email
    - Texto del comentario
    - Botón de enviar
* Al pulsar el botón de enviar, el texto del comentario se incluirá de forma similar a los ya existentes a continuación de estos usando JavaScript. Dichos comentarios desaparecerán al recargar la página.
* Al pulsar el botón de enviar, antes de incluir el texto del comentario se comprobará que todos los campos han sido rellenados. En caso negativo se avisará y no se incluirá el comentario. Además se realizará una validación de email
* Conforme el usuario escribe el comentario, el sistema detectará mediante JavaScript la apariciónde palabras "prohibidas". Cada uno de los caracteres de cada palabra prohibida se sustituirá por un * en tiempo de escritura


## Resolución de la Práctica
Para la resolución de esta práctica, tuve que crear e implementar un nuevo CSS con toda la estructura de la sección de comentarios. Para abrir y cerrar la sección, existe un botón "flotante" que se mantendrá a la izquierda de la página, a la derecha de la sección de comentarios y que al pulsarlo, activará la siguiente función.

```
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
```
En el archivo comentario.js implemento las funciones necesarias para realizar las tareas propuestas. Para que los elementos de la página reaccionasen según el código implementado, había que "asociarles" a los elementos deseados, las funciones necesarias a través de listeners
```
botonComentarios.addEventListener("click", expandirComentarios);
botonSubmit.addEventListener("click", subirComentario);
zonaTextoNuevoComentario.addEventListener("keypress", filtroPalabras)
```
Decidí poner el formulario para enviar comentarios al principio, pues no era capaz de que el comentario nuevo se añadiese al final de los anteriores y encima del formulario... Además me he tomado la libertad de que el formato de las palabras prohibidas, en vez de que se muestre cada caracter con *, se mostrará el primer caracter seguido de los siguientes, éstos si transformados a *

![Imprimi](https://github.com/carmenxufdz/practicasUGR/blob/main/SIBW/P2/comentario.jpg)
