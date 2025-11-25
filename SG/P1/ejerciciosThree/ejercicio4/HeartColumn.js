import * as THREE from '../libs/three.module.js'
 
class HeartColumn extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();

        shape.moveTo(0.0,0.0);
        shape.quadraticCurveTo( 3, 3, 1.5, 4); 
        shape.quadraticCurveTo( 0.75, 5, 0, 3);
        shape.quadraticCurveTo( -0.75, 5, -1.5, 4); 
        shape.quadraticCurveTo( -3, 3, 0, 0);

        var trayectoria_barrido = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( 0, -10, 0 ),
            new THREE.Vector3(-1, -2.5, 0 ),
            new THREE.Vector3( 1, 2.5, 0 ),
            new THREE.Vector3( 0, 10, 0 ),
            ]);

        this.settings = {
            steps: 100,
            depth: 2,
            bevelEnabled: false,
            extrudePath: trayectoria_barrido
        };

        /* 
        // Para rotar figura de shape antes de camino, **hacer giro de la figura** y hacer luego en barrido y esas cosas tipica
        rotateShape (aShape, angle, resolucion = 6) {
            var points = aShape.extractPoints (resolucion).shape;
            var center = points[0];
            points.forEach ((p) => {
                p.rotateAround (center,angle);
            });
            return new THREE.Shape (points);
        }
        */

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshNormalMaterial( { color: 0x00f000 } ); // azul

        this.heart = new THREE.Mesh(geometry, material);
        this.heart.position.y += 3;
        this.add( this.heart );
    }

    update()
    {
        this.heart.rotation.y+=0.01
    }
}



export { HeartColumn };