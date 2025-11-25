import * as THREE from '../../libs/three.module.js'
 
class MyTorus extends THREE.Object3D {
    constructor(gui,titleGui) { // referencia a la gui, y el titulo que tendra la seccion del modelo
        super();

        this.radio_fuera = 1.0;
        this.radio_tubo = 0.2;
        this.res_circulo = 3;
        this.res_tubo = 3;
        
        // Se crea la parte de la interfaz que corresponde al modelo
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Un Mesh se compone de geometría y material
        var torusGeom = new THREE.TorusGeometry(this.radio_fuera,this.radio_tubo,this.res_tubo,this.res_circulo); 
        // Como material se crea uno a partir de las normales
        var torusMat = new THREE.MeshNormalMaterial();
        torusMat.flatShading = false;
        torusMat.needsUpdate = true;

        // Ya podemos construir el Mesh
        this.torus = new THREE.Mesh (torusGeom, torusMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.torus);

        this.rotacion = 0.0;
    }
  
    createGUI (gui,titleGui) {
        // Controles para el tamaño del modelo
        this.guiControls = {
            radio_fuera : 1.0,
            radio_tubo : 0.2,
            res_circulo : 3,
            res_tubo : 3,

            reset : () => {
                this.guiControls.radio_fuera = 1.0;
                this.guiControls.radio_tubo = 1.0;
                this.guiControls.res_circulo = 3;
                this.guiControls.res_tubo = 3;
            }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radio_fuera', 1, 5, 0.1).name ('Radio Principal: ').listen();
        folder.add (this.guiControls, 'radio_tubo', 0.2, 1, 0.1).name ('Radio Tubo: ').listen();
        folder.add (this.guiControls, 'res_circulo', 3, 16, 1).name ('Resolucion Toro: ').listen();
        folder.add (this.guiControls, 'res_tubo', 3, 16, 1).name ('Resolucion Tubo: ').listen();

        folder.add(this.guiControls, 'reset').name ('[Reset]');
    }

    setSombreadoPlano (valor) {
        this.material.flatShading = valor;
        this.material.needsUpdate = true;
    }
    
    update () {
        this.rotacion+=0.01;
        this.rotation.set (this.rotacion,this.rotacion,this.rotacion);
        if(this.guiControls.radio_fuera != this.radio_fuera || this.guiControls.radio_tubo != this.radio_tubo 
        || this.guiControls.res_circulo != this.res_circulo || this.guiControls.res_tubo != this.res_tubo){
            this.radio_fuera = this.guiControls.radio_fuera;
            this.radio_tubo = this.guiControls.radio_tubo;
            this.res_circulo = this.guiControls.res_circulo;
            this.res_tubo = this.guiControls.res_tubo;
            this.torus.geometry.dispose(); 

            this.torus.geometry = new THREE.TorusGeometry(this.radio_fuera,this.radio_tubo,this.res_tubo,this.res_circulo);
        }
    }
}

export { MyTorus };