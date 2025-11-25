import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Skull extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 10, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 1, // — float. Depth to extrude the shape
            bevelEnabled: true
        };
        
        var trayectoria_barrido = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( 0, 0, 2 ),
            new THREE.Vector3( 0, 0, -4 ),
            ]);

        this.settings_ojos = {
            steps: 10, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 5, // — float. Depth to extrude the shape
            bevelEnabled: true,
            extrudePath: trayectoria_barrido
        };

        this.settings_nariz = {
            depth: 1, 
            bevelEnabled: true, 
        }

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshStandardMaterial({
            color: 0xF5DEB3, // A shade of off-white with a yellow tint
            roughness: 0.5, // Adjust the roughness to your liking
            metalness: 0.1, // Adjust the metalness to your liking
          });
        const extrude = new THREE.Mesh(geometry, material);

        var spheregeom = new THREE.SphereGeometry(5.1,32,32);
        const sphere = new THREE.Mesh(spheregeom, material);
        sphere.position.set(0,0,0);

        var boxgeom = new THREE.BoxGeometry(11,11,11);
        const box = new THREE.Mesh(boxgeom,material);
        box.position.set(0,0,6);

        

        var eye = new THREE.Shape();
        eye.moveTo(-1,0);
        eye.bezierCurveTo(-1,2,1,2,1,0);
        eye.bezierCurveTo(1,-2,-1,-2,-1,0);

        var eyesgeom = new THREE.ExtrudeGeometry(eye, this.settings_ojos);

        const ojo1 = new THREE.Mesh(eyesgeom, material);
        const ojo2 = ojo1.clone();
        ojo2.position.x+=2;
        ojo1.position.x-=2;
        ojo1.rotateZ(90*Math.PI/180);
        ojo2.rotateZ(90*Math.PI/180);
        
        const ojos = new CSG();
        ojos.union([ojo1, ojo2]);

        var nose = new THREE.Shape();
        nose.moveTo( 25, 25 );
        nose.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
        nose.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
        nose.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
        nose.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
        nose.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
        nose.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

        var nosegeom = new THREE.ExtrudeGeometry(nose, this.settings_nariz);

        const nariz = new THREE.Mesh(nosegeom, material);
        nariz.scale.set(0.01,0.01,2);
        nariz.position.set(-0.25,-3,-1);
        const craneo = new CSG();
        craneo.union([sphere]);
        craneo.subtract([box]);

        var bocageom = new THREE.BoxGeometry(14,0.75,1);

        const boca = new THREE.Mesh(bocageom, material);

        boca.position.y=-5.75;
        boca.position.z=1;

        const figure = new CSG();
        figure.union([extrude, craneo.toMesh()]);
        figure.subtract([ojos.toMesh(), nariz, boca]);
        const resultadoCSG = figure.toMesh();

        const objeto = new THREE.Object3D();
        objeto.add(resultadoCSG);
        this.add(objeto);

    }

    createShape(shape)
    {
        shape.moveTo(0,0);
        shape.absarc(0,0,5,300*Math.PI/180, 240*Math.PI/180);
        shape.lineTo(-2,-7);
        shape.lineTo(2,-7);

    }
    update()
    {
    }
}

export { Skull };
