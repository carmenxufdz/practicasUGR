import * as THREE from '../../libs/three.module.js'

class Ring extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var ringMat = new THREE.MeshStandardMaterial({
            color: 0xe6be08,
            roughness: 0.1,
            metalness: 0.6,
        });
        var diamondMat = new THREE.MeshStandardMaterial({
            color: 0x11e1e1,
            roughness: 0.1,
            metalness: 0.4,
        });

        var diamond= [];

        //añadimos los puntos
        this.creatediamond(diamond);

        var Geometrydiamond = new THREE.LatheGeometry(diamond,6);
        var torusGeom = new THREE.TorusGeometry (0.5,0.1,30,30);

        Geometrydiamond.scale(0.25,0.25,0.25)
        Geometrydiamond.translate(0,0.5,0)


        var meshdiamond = new THREE.Mesh(Geometrydiamond, diamondMat);
        var meshToro = new THREE.Mesh(torusGeom, ringMat);

        this.add(meshToro);
        this.add(meshdiamond);
    }


    creatediamond(diamond){
        diamond.push (new THREE.Vector3 (0, 0, 0));
        diamond.push (new THREE.Vector3 (2, 2, 0));
        diamond.push (new THREE.Vector3 (1.5, 3, 0));
        diamond.push (new THREE.Vector3 (1, 2, 0));
        diamond.push (new THREE.Vector3 (0, 3, 0));
        diamond.push (new THREE.Vector3 (1.5,3, 0));
        diamond.push (new THREE.Vector3 (2,2, 0));
        diamond.push (new THREE.Vector3 (1,2, 0));
        diamond.push (new THREE.Vector3 (0,2, 0));
    }

    update()
    {
    }
}

export { Ring };
