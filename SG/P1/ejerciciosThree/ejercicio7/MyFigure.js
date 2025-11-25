import * as THREE from '../libs/three.module.js'

class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui)

        // Materiales de color
        this.materialrojo = new THREE.MeshPhongMaterial({color: 0xFF0000})
        this.materialverde = new THREE.MeshPhongMaterial({color: 0x00FF00 })
        this.materialazul = new THREE.MeshPhongMaterial({color: 0x0000FF})
        this.materialamarillo = new THREE.MeshPhongMaterial({color: 0xFFFF00})

        var boxUno = new THREE.BoxGeometry(4.0, 1.0, 1.0)
        var boxDos = new THREE.BoxGeometry(2.0, 1.0, 1.0)
        
        boxUno.translate(0, -0.5, 0)
        boxDos.translate(0, -0.5, 0)

        this.parteArriba = new THREE.Mesh(boxUno, this.materialverde)
        this.parteArriba.scale.y=4.0
        
        this.parteCentral = new THREE.Mesh(boxUno, this.materialrojo)
        this.parteCentral.scale.y=this.guiControls.escalaCentro
        this.parteCentral.position.y=-4.0
        
        this.parteAbajo = new THREE.Mesh(boxUno, this.materialverde)
        this.parteAbajo.scale.y=4.0
        this.parteAbajo.position.y=-4.0-this.guiControls.escalaCentro

        this.nodoUno = new THREE.Object3D()
        this.nodoUno.add(this.parteArriba)
        this.nodoUno.add(this.parteCentral)
        this.nodoUno.add(this.parteAbajo)

        this.parteAzul = new THREE.Mesh(boxDos, this.materialazul)
        this.parteAzul.scale.y=this.guiControls.escalaAzul
        this.parteAzul.position.z=1.0

        this.nodoDos = new THREE.Object3D()
        this.nodoDos.add(this.parteAzul)
        
        this.nodoDos.position.y=1.0
        this.nodoPequeño = new THREE.Object3D() //nuevo nodo para mover la y del secundario entre el 10% y 90% de PP
        this.nodoPequeño.add(this.nodoDos)

        this.nodoUno.add(this.nodoPequeño)
        this.add(this.nodoUno)
        this.nodoUno.position.y = 2.0

    }
  
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            escalaCentro : 5.0,
            rotacionGrande : 0.0,
            escalaAzul : 10.0,
            rotacionAzul : 0.0,
            posicionAzul : 10.0,
      
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        reset : () => {
                this.guiControls.escalaCentro = 5.0
                this.guiControls.rotacionGrande = 0.0;
                this.guiControls.escalaAzul = 10.0;
                this.guiControls.rotacionAzul = 0.0;
                this.guiControls.posicionAzul = 10.0
            }
        } 
    
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'escalaCentro', 5.0, 10.0, 1.0).name ('Escala centro : ').listen();
        folder.add (this.guiControls, 'rotacionGrande', -0.8, 0.8, 0.1).name ('Rotacion grande : ').listen();
        folder.add (this.guiControls, 'escalaAzul', 10.0, 20.0, 1.0).name ('Escala azul : ').listen();
        folder.add (this.guiControls, 'rotacionAzul', -0.8, 0.8, 0.1).name ('Rotación azul : ').listen();
        folder.add (this.guiControls, 'posicionAzul', 10, 90, 0.1).name ('Posicion % : ').listen();
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
  
    update () {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
    
        this.parteCentral.scale.y=this.guiControls.escalaCentro
        this.parteAbajo.position.y=-4.0-this.guiControls.escalaCentro

        this.parteAzul.scale.y=this.guiControls.escalaAzul

        this.nodoPequeño.rotation.z=this.guiControls.rotacionAzul
        this.nodoPequeño.position.y=-4.0- (this.guiControls.posicionAzul/100*this.guiControls.escalaCentro)

        this.rotation.z=this.guiControls.rotacionGrande
    }
}

export { MyFigure };