# Práctica 4: PHP (II)

## Descripción de la Práctica
En esta práctica se pretende dotar a la web de una interfaz que permita editar toda la información del sistem sin tener que acceder en ningún momento a los datos de MySQL a través de la consola u herramientas tipo phpmyadmin. Para ello habrá que desarrollar un "panel de control" que, dependeiendo del tipo de usuario que se haya conectado al sistema, mostrará formularios e información como la que se detalla a continuación

* <b>Tipos de usuarios:</b>
    - Anónimo: Cualquier usuario que no se haya identificado en el sistema. No podrá acceder a ninguna opción de edición de contenidos. Podrá darse de alta en la plataforma como usuario registrado.
    - Usuario registrado: Podrá incluir comentarios en cada actividad de montaña del sitio y cambiar sus datos de usuario.
    - Usuario moderador: Podrá editar o borrar comentarios.
    - Usuario gestor del sitio: Podrá editar, borrar o añadir actividades y hashtags a las mismas.
    - Superusuario: Podrá realizar cualquier acción, incluyendo modificar los roles de los usuarios.

* <b>Edición de los datos de los usuarios:</b> Cualquier usuario identificado debe poder cambiar sus datos personales, email, etc.

* <b>Moderación:</b> El usuario moderador debe poder borrar y/o modificar comentarios. En caso de que se modifiquen, en el comentario debe aparecer un mensaje del estilo "Mensaje editado por el moderador". Para acceder al borrado/edición de comentarios, en cada comentario debe aparecer un pequeño ícono para borrarlo y otro para saltar a un formulario de edición (si un usuario moderador está logueado en el sistema). Además, debe poder acceder a un listado de todos los comentarios existentes en todas las actividades. Como extra evaluable, se puede añadir la opción de buscar comentarios.

* <b>Gestión del sitio:</b> Los gestores del sitio deben ser capaces de añadir, editar o borrar actividades de montaña mediante los formularios apropiados. Para acceder a dichos formularios, aparecerán unos íconos oportunos en la página de la actividad (si el usuario identificado tiene permisos de gestor). Además, existirá un listado de todas las actividades del sitio y, adicionalmente, una opción de búsqueda dentro de las descripciones y nombres para localizarlas rápidamente. Debe permitirse la inclusión de hashtags así como incluir una o más fotografías.

* <b>Gestión de permisos de usuarios:</b> El superusuario debe poder añadir o quitar permisos de moderación o gestión a cualquier otro usuario. Se añadirá la posibilidad de dar o quitar permisos de superusuario a otro usuario (nunca puede quedarse el sistema sin al menos un superusuario).
