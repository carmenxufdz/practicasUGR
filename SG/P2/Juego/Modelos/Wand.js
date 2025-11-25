import * as THREE from '../../libs/three.module.js'

class Wand extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.removed = false;

        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 1, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 1, // — float. Depth to extrude the shape
            bevelEnabled: true, // — bool. Apply beveling to the shape
            bevelThickness: 0.1,// — float. How deep into the original shape the bevel goes
            bevelSize: 0.1, //  float. Distance from the shape outline that the bevel extends
            bevelSegments: 5 // — int. Number of bevel layers
        };

        var stargeom = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshStandardMaterial( { 
            color: 0xffff00, 
            metalness: 0.8,
            roughness: 0.1,
            specular: 0xffffff,
            specularIntensity: 2,
            emissive: 0xffffff,
            emissiveIntensity: 0.5,
        } ); // amarillo

        this.star = new THREE.Mesh(stargeom, material);
        this.star.scale.set(0.2,0.2,0.2);
        this.star.position.set(0,2.5,-0.1);

        var cylindergeom = new THREE.CylinderGeometry(0.1,0.1,5,30);

        this.cylinder = new THREE.Mesh(cylindergeom, material);

        this.add( this.star );
        this.add( this.cylinder );

        this.scale.set(0.1,0.1,0.1);

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

export { Wand };
