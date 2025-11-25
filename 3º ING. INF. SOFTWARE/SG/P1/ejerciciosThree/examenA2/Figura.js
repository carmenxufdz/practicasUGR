import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'

class Figura extends THREE.Object3D {
    constructor(gui,titleGui)
    {
        super();

        this.createGUI(gui,titleGui);
        
        var material = new THREE.MeshNormalMaterial();
        
        var base = new THREE.Shape();
        base.moveTo(0,0);
        base.lineTo(5,0);
        base.lineTo(5,5);
        base.lineTo(2,5);
        base.quadraticCurveTo(0,5,0,0);


        var extrudeBaseSettings = {
            steps: 10,
            depth: 5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 10
        };

        const baseGeom = new THREE.ExtrudeGeometry(base, extrudeBaseSettings);
        const baseMesh = new THREE.Mesh( baseGeom, material );

        var bloque = new THREE.Shape();
        bloque.moveTo(0.5,0);
        bloque.lineTo(6.5,1);
        bloque.quadraticCurveTo(7,1.25,7,1.5);
        bloque.lineTo(7,7);
        bloque.lineTo(0,7);
        bloque.lineTo(0,0.5);
        bloque.quadraticCurveTo(0,0,0.5,0);

        var extrudeBloqueSettings = {
            steps: 10,
            depth: 3,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 10
        };

        const bloqueGeom = new THREE.ExtrudeGeometry(bloque, extrudeBloqueSettings);
        const bloqueMesh = new THREE.Mesh( bloqueGeom, material );
        bloqueMesh.position.set(-0.5,0.5,1);

        var agujero = new THREE.Shape();
        agujero.moveTo(-0.25,0);
        agujero.bezierCurveTo(-0.25,1,0.25,1,0.25,0);
        agujero.bezierCurveTo(0.25,-1,-0.25,-1,-0.25,0);

        var extrudeAgujeroSettings = {
            steps: 10,
            depth: 5,
            bevelEnabled: true,
            bevelThickness: 3,
            bevelSize: 3,
            bevelOffset: 0,
            bevelSegments: 10
        };

        const agujeroGeom = new THREE.ExtrudeGeometry(agujero, extrudeAgujeroSettings);
        const agujeroMesh = new THREE.Mesh(agujeroGeom, material);
        
        agujeroMesh.scale.set(0.1,0.1,0.1);
        agujeroMesh.rotateY(90*Math.PI/180);
        agujeroMesh.rotateX(90*Math.PI/180);
        agujeroMesh.position.set(2.5,-0.2,2.5);

        var hueco = new THREE.Shape();
        hueco.moveTo(0.1,0);
        hueco.lineTo(0.4,0);
        hueco.quadraticCurveTo(0.5,0,0.5,0.1);
        hueco.lineTo(0.5,0.4);
        hueco.quadraticCurveTo(0.5,0.5,0.4,0.5);
        hueco.lineTo(0.1,0.5);
        hueco.quadraticCurveTo(0,0.5,0,0.4);
        hueco.lineTo(0,0.1);
        hueco.quadraticCurveTo(0,0,0.1,0);

        var extrudeHuecoSettings = {
            steps: 10,
            depth: 5.5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 10
        };

        const huecoGeom = new THREE.ExtrudeGeometry(hueco, extrudeHuecoSettings);
        const huecoMesh = new THREE.Mesh( huecoGeom, material );
        huecoMesh.position.set(3,2,-0.3);


        var csg = new CSG();
        csg.union([baseMesh]);
        csg.subtract([bloqueMesh, agujeroMesh, huecoMesh]);

        var resultadoMesh = csg.toMesh();

        this.add(resultadoMesh);
    }

    createGUI(gui,titleGui)
    {
    }

    update()
    {
    }
}

export {Figura}