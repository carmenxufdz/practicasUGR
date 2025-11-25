import * as THREE from '../libs/three.module.js'

class Spade extends THREE.Object3D{
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 1, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 1, // — float. Depth to extrude the shape
            bevelEnabled: true, // — bool. Apply beveling to the shape
            bevelThickness: 0.5,// — float. How deep into the original shape the bevel goes
            bevelSize: 0.5, //  float. Distance from the shape outline that the bevel extends
            bevelSegments: 1 // — int. Number of bevel layers
        };

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshPhysicalMaterial( { color: 0x0000ff} ); // azul

        this.pica = new THREE.Mesh(geometry, material);
        this.pica.scale.set(0.6, 0.6, 0.6);
        this.pica.rotation.z += Math.PI; //Girar 180º
        this.pica.position.y += 4;
        this.pica.position.z -= 0.1;

        this.puntospie = []; //Contorno para puntos del pie
        this.puntospie.push(new THREE.Vector3(0.0, 0.0, 0.0));
        this.puntospie.push(new THREE.Vector3(0.7, 0.0, 0.0));
        this.puntospie.push(new THREE.Vector3(0.1, 0.5, 0.0));
        this.puntospie.push(new THREE.Vector3(0.2, 3, 0.0));
        this.puntospie.push(new THREE.Vector3(0.0, 3, 0.0));
        this.geopie = new THREE.LatheGeometry(this.puntospie, 40, 0, 2*Math.PI); //
        this.pie = new THREE.Mesh(this.geopie, material);

        this.spade = new THREE.Object3D(); //Estructura con todas las partes
        this.spade.add(this.pie);
        this.spade.add(this.pica);

        this.add( this.spade );
    }

    createShape(shape)
    {
        shape.moveTo( 0, 0 ); //Punto de abajo del corazon - abajo
        shape.quadraticCurveTo( 3, 3, 1.5, 4); //PC1 y B
        shape.quadraticCurveTo( 0.75, 5, 0, 3); //PC2 y C
        shape.quadraticCurveTo( -0.75, 5, -1.5, 4); //PC3 y D
        shape.quadraticCurveTo( -3, 3, 0, 0); //PC4 y A
    }

    update()
    {
        this.spade.rotation.y+=0.01;
    }
}

export { Spade };