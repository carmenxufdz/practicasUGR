# Práctica 1: HTML y CSS

## Descripción de la Práctica
El objetivo de esta práctica es el diseño de tres páginas con HTML + CSS, a saber:

* portada.html: La portadad de un sitio web que muestre información sobre posibles actividades en la montaña. El aspecto de la página debe ser similar al planteado en la figura 1:
    - Una zona de cabecera que deberá contener el nombre del sitio, algún logotipo y un menú horizontal.
    - Una zona lateral auxiliar donde aparecerán enlaces de interés.
    - Una zona principal donde se mostrarán fotos de las actividades de montaña junto con su nombre
    - Un pie con alguna nota de _Copyright_

* actividad.html: Vista en detalle de una de las actividades enlazadas desde la portada. La estructura de la página tiene elementos comunes con la portada, pero en la zona principal mostraremos información adicional de la actividad, por ejemplo:
    - Nombre de la actividad
    - Precio
    - Fotografía (o más de una), con su pie
    - Algunos párrafos describiendo la actividad
    - Botones o imágenes de redes sociales: al menos Facebook, Twitter e Imprimir
    - El botón Imprimir que llevará a la página actividad_imprimir.html

* actividad_imprimir.html: Contendrá la misma información que actividad.html pero formateada para la impresión de contenido. Es decir:
    - No dispondrá de menú de la cabecera ni el espacio auxiliar.
    - El logotipo se mostrará en otra posción.
    - Otra tipografía más clara
    - Fondo blaco, letra negra
    - Sin botones de redes sociales

<p align="center">
  <img src="https://github.com/carmenxufdz/practicasUGR/blob/main/SIBW/P1/esquema.jpg" alt="Figura 1"/>
</p>

## Resolución de la Práctica
Para realizar lo que sería la estructura general de la página web: cabecera, menú, cuerpo y pie de página; utilicé un CSS en el que implemento cada uno de estas partes de la página web. Este CSS se utiliza tanto en la portada.html como en actividad.html. Además, para cada página implementé su propio CSS para el manejo del grid y la distribución de la página. 

En el menú horizontal, decidí crear un sub-menú desplegable para las actividades, y que al clickear en estas te llevasen también a la página de cada actividad; el menú Home que te llevará a portada.html; otro sub-menú desplegable para una página extra que creé de Montañar y un último menú no funcional para lo que sería una página de contacto.


![Portada](https://github.com/carmenxufdz/practicasUGR/blob/main/SIBW/P1/portada.jpg)

![Actividad](https://github.com/carmenxufdz/practicasUGR/blob/main/SIBW/P1/actividad.jpg)

Para actividad_imprimir.html utilizo un CSS diferente y propio para crear  un estilo de hoja de imprenta. Se usan fuentes más legibles y todo está en blanco y negro, incluido el logo.

![Imprimir](https://github.com/carmenxufdz/practicasUGR/blob/main/SIBW/P1/imprimir.jpg)
