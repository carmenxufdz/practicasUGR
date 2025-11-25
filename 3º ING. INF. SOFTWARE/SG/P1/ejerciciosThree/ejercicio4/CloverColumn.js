import * as THREE from '../libs/three.module.js'

class CloverColumn extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();

        shape.moveTo(0, 6); //Punto inicial - Parte de abajo (en medio) del trebol
        shape.quadraticCurveTo(0, 0, -6, 0); //Punto 0,0 como "apoyo" hasta -6,0
        shape.quadraticCurveTo(-12, 0, -12, 6); //Fijamos otro punto (a la misma distancia del otro y en mismo eje)
        shape.quadraticCurveTo(-12, 12, -6, 12); //-6,12 es punto de arriba a la izq en medio
        shape.moveTo(-6,15);
        shape.quadraticCurveTo(-6, 21, 0, 21); //0,21 es el punto de más arriba -6 de dista para el otro punto
        shape.quadraticCurveTo(6, 21, 6, 15); //La inversa del anterio
        shape.moveTo(6,12);
        shape.quadraticCurveTo(12, 12, 12, 6); //Fijamos 12,12 y vamos al 12,6
        shape.quadraticCurveTo(12, 0, 6, 0);
        shape.quadraticCurveTo(0, 0, 0, 6); //Vuelta al punto original

        

        var trayectoria_barrido = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( 0, -10, 0 ),
            new THREE.Vector3(-3, -6, 0 ),
            new THREE.Vector3( 3, 6, 0 ),
            new THREE.Vector3( 0, 10, 0 ),
            ]);

        this.settings = {
            steps: 100,
            depth: 1,
            bevelEnabled: true,
            extrudePath: trayectoria_barrido
        };

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshNormalMaterial( { color: 0x00f000 } ); // azul

        this.clover = new THREE.Mesh(geometry, material);
        this.clover.scale.set(0.2, 1, 0.2);
        this.clover.position.y += 2;
        this.clover.position.z -= 0.25;
        this.add( this.clover );
    }

    update()
    {
        this.clover.rotation.y+=0.01
    }
}



export { CloverColumn };