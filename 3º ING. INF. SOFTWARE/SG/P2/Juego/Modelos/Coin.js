import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Coin extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.removed = false;
        
        var shape = new THREE.Shape();
        this.createShape(shape);

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../../imgs/metal.jpg');


        this.settings = {
            steps: 10, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 0.1, // — float. Depth to extrude the shape
        };

        var stargeom = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshStandardMaterial( { 
            color: 0xffff00, 
            roughness: 0.25,
            metalness: 0.5,
            map: texture 
        } ); // amarillo

        this.star = new THREE.Mesh(stargeom, material);
        this.star.scale.set(0.15,0.15,1);
        this.star.position.set(0,0,0);


        var cylindergeom = new THREE.CylinderGeometry(1.5,1.5,0.5,30);

        this.cylinder = new THREE.Mesh(cylindergeom, material);
        this.cylinder.rotateZ(90*Math.PI/180);
        this.cylinder.rotateX(90*Math.PI/180);

        var coinCSG = new CSG();
        coinCSG.union([this.cylinder]);
        coinCSG.subtract([this.star]);

        this.coin = coinCSG.toMesh();

        this.add(this.coin);

        this.scale.set(0.25,0.25,0.25);
    }

    createShape(shape)
    {
        shape.moveTo(0, -3);
        shape.lineTo(4,-6);
        shape.lineTo(3,0);
        shape.lineTo(7,3);
        shape.lineTo(2,3);
        shape.lineTo(0,8);
        shape.lineTo(-2,3);
        shape.lineTo(-7,3);
        shape.lineTo(-3, 0);
        shape.lineTo(-4,-6);
    }
    update()
    {
    }
}

export { Coin };
