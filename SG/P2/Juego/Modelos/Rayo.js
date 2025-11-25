import * as THREE from '../../libs/three.module.js'

class Rayo extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.removed = false;
        
        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 1, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 0.1, // — float. Depth to extrude the shape
            bevelEnabled: true, // — bool. Apply beveling to the shape
            bevelThickness: 0.1,// — float. How deep into the original shape the bevel goes
            bevelSize: 0.1, //  float. Distance from the shape outline that the bevel extends
            bevelSegments: 5 // — int. Number of bevel layers
        };

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshStandardMaterial( { color: 0xffff00, metalness: 1, roughness: 0.5 } ); // amarillo

        this.rayo = new THREE.Mesh(geometry, material);

        this.add( this.rayo );

        this.rayo.rotateZ(-15*Math.PI/180);

        this.scale.set(0.2,0.2,0.2);
    }

    createShape(shape)
    {
        shape.moveTo(-0.2,2);
        shape.lineTo(-1,-1);
        shape.lineTo(0.1,-0.3);
        shape.lineTo(0.2,-2);
        shape.lineTo(1,1);
        shape.lineTo(-0.1,0.3);
    }
    update()
    {
    }
}

export { Rayo };
