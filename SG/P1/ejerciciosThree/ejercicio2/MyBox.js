import * as THREE from '../libs/three.module.js'

class MyBox extends THREE.Object3D {
    constructor(gui,titleGui)
    {
        super();

        this.createGUI(gui,titleGui);

        var boxGeom = new THREE.BoxGeometry(1,1,1);
        var boxMat = new THREE.MeshNormalMaterial();
        boxMat.flatShading = true;
        boxMat.needsUpdate = true;

        var box = new THREE.Mesh(boxGeom,boxMat);
        
        this.add(box);

        this.rotacion = 0.0;
    }

    createGUI(gui,titleGui)
    {
        this.guiControls = {
            sizeX : 1.0,
            sizeY : 1.0,
            sizeZ : 1.0,

            reset : () => {
                this.guiControls.sizeX = 1.0;
                this.guiControls.sizeY = 1.0;
                this.guiControls.sizeZ = 1.0;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name ('Tamaño X : ').listen();
        folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name ('Tamaño Y : ').listen();
        folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name ('Tamaño Z : ').listen();
        
        folder.add(this.guiControls, 'reset').name('[Reset]');   
    }

    update()
    {
        this.rotacion += 0.01;

        this.rotation.set(this.rotacion, this.rotacion, this.rotacion);
        this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    }
}

export { MyBox };
