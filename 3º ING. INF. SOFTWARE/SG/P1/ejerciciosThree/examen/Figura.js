import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Figura extends THREE.Object3D {
    constructor(gui,titleGui)
    {
        super();

        this.createGUI(gui,titleGui);
        
        var material = new THREE.MeshNormalMaterial();
        
        var base = new THREE.Shape();
        base.moveTo(-4.5,0);
        base.lineTo(4.5,0);
        base.quadraticCurveTo(5,0,5,0.25);
        base.quadraticCurveTo(5,0.5,4.5,0.5);
        
        base.lineTo(-4.5,0.5);
        base.quadraticCurveTo(-5,0.5,-5,0.25);
        base.quadraticCurveTo(-5,0,-4.5,0);


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
        baseMesh.position.z-=2.5;


        const cylinderGeom = new THREE.CylinderGeometry(1.5, 1.5, 3, 30);
        const cylinderMesh = new THREE.Mesh(cylinderGeom, material);

        cylinderMesh.position.y+=1.5;

        const cylinderlat = new THREE.CylinderGeometry(0.75,0.75,5,30);
        const cylinderLatMesh = new THREE.Mesh(cylinderlat, material);
        
        const cylinderLat2Mesh = cylinderLatMesh.clone();

        cylinderLatMesh.position.set(-4,0,0);
        cylinderLat2Mesh.position.set(4,0,0);

        const huecos = new THREE.CylinderGeometry(0.5,0.5,5,30);
        const huecosMesh = new THREE.Mesh(huecos, material);

        const huecos2Mesh = huecosMesh.clone();

        huecosMesh.position.set(-2,0,2);
        huecos2Mesh.position.set(-2,0,-2);



        const capsulaGeom = new THREE.CapsuleGeometry(1.5,3,30);
        const capsulaMesh = new THREE.Mesh(capsulaGeom, material);

        capsulaMesh.rotateZ(-90*Math.PI/180);
        capsulaMesh.position.set(-6,1.5,0);
        

        const cap = new THREE.Shape();

        cap.moveTo(-1,0);
        cap.bezierCurveTo(-1,2,1,2,1,0);
        cap.bezierCurveTo(1,-2,-1,-2,-1,0);

        var extrudeCapSettings = {
            steps: 10,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            bevelOffset: 0,
            bevelSegments: 10
        };

        const capGeom = new THREE.ExtrudeGeometry(cap, extrudeCapSettings);
        const capsulaArribaMesh = new THREE.Mesh(capGeom, material);
        capsulaArribaMesh.rotateZ(90*Math.PI/180);
        capsulaArribaMesh.rotateY(90*Math.PI/180);
        capsulaArribaMesh.position.x+=1.5;

        const corteFigura = new THREE.BoxGeometry(2,10,5);
        const corteFiguraMesh = new THREE.Mesh(corteFigura, material);
        corteFiguraMesh.rotateZ(60*Math.PI/180);
        corteFiguraMesh.position.set(0,3,0);

        var figuracsg = new CSG();
        figuracsg.union([cylinderMesh, capsulaArribaMesh]);
        figuracsg.subtract([corteFiguraMesh]);

        var figura = figuracsg.toMesh();
        figura.position.set(0,1.5,0);


        const corte = new THREE.BoxGeometry(12,1,12);
        const corteMesh = new THREE.Mesh(corte, material);
        corteMesh.position.set(0,-0.5,0);
        var csg = new CSG();
        csg.union([baseMesh, figura]);
        csg.subtract([capsulaMesh, corteMesh]);
        csg.subtract([huecos2Mesh,huecosMesh, cylinderLatMesh, cylinderLat2Mesh]);


        var resultado = csg.toMesh();

        this.add(resultado);
    }

    createGUI(gui,titleGui)
    {
    }

    update()
    {
    }
}

export { Figura };
