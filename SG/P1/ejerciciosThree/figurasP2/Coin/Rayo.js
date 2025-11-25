import * as THREE from '../../libs/three.module.js'

class Rayo extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 10, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 0.1, // — float. Depth to extrude the shape
        };

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshPhysicalMaterial( { color: 0xffff00 } ); // amarillo

        this.rayo = new THREE.Mesh(geometry, material);

        this.add( this.rayo );

        this.rayo.rotateZ(-30*Math.PI/180);
    }

    createShape(shape)
    {
        shape.moveTo(-0.2,2,0);
        shape.lineTo(-1,-1,0);
        shape.lineTo(0.1,-0.3,0);
        shape.lineTo(0.2,-2,0);
        shape.lineTo(1,1,0);
        shape.lineTo(-0.1,0.3,0);
    }
    update()
    {
    }
}

export { Rayo };
