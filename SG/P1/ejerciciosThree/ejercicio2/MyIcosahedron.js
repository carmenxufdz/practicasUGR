import * as THREE from '../libs/three.module.js'

class MyIcosahedron extends THREE.Object3D{
    constructor(gui, titleGui)
    {
        super();

        this.radio = 1.0;
        this.subdivision = 0;

        this.createGUI(gui, titleGui);

        var icosahedronGeom = new THREE.IcosahedronGeometry(this.radio, this.subdivision);
        var icosahedronMat = new THREE.MeshNormalMaterial();
        icosahedronMat.flatShading = true;
        icosahedronMat.needsUpdate = true;

        this.icosahedron = new THREE.Mesh(icosahedronGeom,icosahedronMat);

        this.add(this.icosahedron);

        this.rotacion = 0.0;
    }

    createGUI(gui, titleGui)
    {
        this.guiControls = {
            radio : 1.0,
            subdivision : 0,

            reset : () => {
                this.guiControls.radio = 1.0;
                this.guiControls.subdivision = 0;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add (this.guiControls, 'radio', 0.1, 5.0, 0.1).name ('Radio: ').listen();
        folder.add (this.guiControls, 'subdivision', 0, 3, 1).name ('Subdivision: ').listen();

        folder.add(this.guiControls, 'reset').name('[Reset]');  

    }

    update()
    {
        this.rotacion += 0.01;

        this.rotation.set(this.rotacion, this.rotacion, this.rotacion);

        if(this.guiControls.radio != this.radio || this.guiControls.subdivision != this.subdivision){
            this.radio = this.guiControls.radio;
            this.subdivision = this.guiControls.subdivision;

            this.icosahedron.geometry.dispose();

            this.icosahedron.geometry = new THREE.IcosahedronGeometry(this.radio, this.subdivision);
        }
    }
}

export { MyIcosahedron };