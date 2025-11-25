import * as THREE from '../libs/three.module.js'

class MyCone extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.radio = 1.0;
        this.altura = 1.0;
        this.resolucion = 5;

        this.createGUI(gui,titleGui);

        var coneGeom = new THREE.ConeGeometry(this.radio, this.altura, this.resolucion);
        var coneMat = new THREE.MeshNormalMaterial();
        coneMat.flatShading = true;
        coneMat.needsUpdate = true;

        this.cone = new THREE.Mesh(coneGeom, coneMat);

        this.add(this.cone);

        this.rotacion = 0.0;
    }

    createGUI(gui, titleGui)
    {
        this.guiControls = {
            radio : 1.0,
            altura : 1.0,
            resolucion : 5,

            reset : () => {
                this.guiControls.radio = 1.0;
                this.guiControls.altura = 1.0;
                this.guiControls.resolucion = 5;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add (this.guiControls, 'radio', 0.1, 5.0, 0.1).name ('Radio: ').listen();
        folder.add (this.guiControls, 'altura', 0.1, 5.0, 0.1).name ('Altura: ').listen();
        folder.add (this.guiControls, 'resolucion', 3, 12, 1).name ('Resolucion: ').listen();    

        folder.add(this.guiControls, 'reset').name('[Reset]');  
    }

    update()
    {
        this.rotacion += 0.01;

        this.rotation.set(this.rotacion, this.rotacion, this.rotacion);

        if(this.guiControls.radio != this.radio || this.guiControls.altura != this.altura || this.guiControls.resolucion != this.resolucion){
            this.radio = this.guiControls.radio;
            this.altura = this.guiControls.altura;
            this.resolucion = this.guiControls.resolucion;
            this.cone.geometry.dispose();

            this.cone.geometry = new THREE.ConeGeometry(this.radio, this.altura, this.resolucion);
        }


    }
}

export { MyCone };