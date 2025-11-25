import * as THREE from '../libs/three.module.js'

class MySphere extends THREE.Object3D{
    constructor(gui, titleGui)
    {
        super();
        
        this.radio = 1.0;
        this.res_ecuador = 3;
        this.res_meridiano =2;

        this.createGUI(gui, titleGui);

        var sphereGeom = new THREE.SphereGeometry(this.radio,this.res_ecuador, this.res_meridiano);
        var sphereMat = new THREE.MeshNormalMaterial();
        sphereMat.flatShading = false;
        sphereMat.needsUpdate = true;

        this.sphere = new THREE.Mesh(sphereGeom,sphereMat);

        this.add(this.sphere);

        this.rotacion = 0.0;
    }

    createGUI(gui, titleGui)
    {
        this.guiControls = {
            radio : 1.0,
            res_ecuador : 3,
            res_meridiano : 2,

            reset : () => {
                this.guiControls.radio = 1.0;
                this.guiControls.res_ecuador = 3;
                this.guiControls.res_meridiano = 2;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add (this.guiControls, 'radio', 0.1, 5.0, 0.1).name ('Radio: ').listen();
        folder.add (this.guiControls, 'res_ecuador', 3, 15, 1).name ('Resolucion Ecuador: ').listen();
        folder.add (this.guiControls, 'res_meridiano', 2, 10, 1).name ('Resolucion Meridiano: ').listen();

        folder.add(this.guiControls, 'reset').name('[Reset]');  
    }

    update()
    {
        this.rotacion += 0.01;

        this.rotation.set(this.rotacion, this.rotacion, this.rotacion);

        if(this.guiControls.radio != this.radio || this.guiControls.res_ecuador != this.res_ecuador || this.guiControls.res_meridiano != this.res_meridiano){
            this.radio = this.guiControls.radio;
            this.res_ecuador = this.guiControls.res_ecuador;
            this.res_meridiano = this.guiControls.res_meridiano

            this.sphere.geometry.dispose();

            this.sphere.geometry = new THREE.SphereGeometry(this.radio, this.res_ecuador, this.res_meridiano);
        }
    }
}

export { MySphere }