import * as THREE from '../libs/three.module.js'

class Diamond extends THREE.Object3D{
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 1, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 1, // — float. Depth to extrude the shape
        };

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshPhysicalMaterial( { color: 0xcf0000 } ); // rojo

        this.diamante = new THREE.Mesh(geometry, material);

        this.add( this.diamante );
    }

    createShape(shape)
    {
        shape.moveTo(0.0,0.0);
        shape.lineTo(1.5,2.5);
        shape.lineTo(0.0,5.0);
        shape.lineTo(-1.5,2.5);
    }

    update()
    {
        this.diamante.rotation.y+=0.01
    }
}
export { Diamond };