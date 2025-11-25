import * as THREE from '../libs/three.module.js'

class Clover extends THREE.Object3D{
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 2,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshPhysicalMaterial( { color: 0x0000FF } ); // azul

        this.trebol = new THREE.Mesh(geometry, material);

        this.trebol.scale.set(0.25, 0.25, 0.25);
        this.trebol.position.y += 2;
        this.trebol.position.z -= 0.1;

        this.puntospie = []; //Contorno para puntos del pie
        this.puntospie.push(new THREE.Vector3(0.0, 0.0, 0.0));
        this.puntospie.push(new THREE.Vector3(0.7, 0.0, 0.0));
        this.puntospie.push(new THREE.Vector3(0.1, 0.5, 0.0));
        this.puntospie.push(new THREE.Vector3(0.2, 3, 0.0));
        this.puntospie.push(new THREE.Vector3(0.0, 3, 0.0));
        this.geopie = new THREE.LatheGeometry(this.puntospie, 40, 0, 2*Math.PI); //
        this.pie = new THREE.Mesh(this.geopie, material);

        this.clover = new THREE.Object3D(); //Estructura con todas las partes
        this.clover.add(this.pie);
        this.clover.add(this.trebol);

        this.add( this.clover );
    }

    createShape(shape)
    {
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
    }

    update()
    {
        this.clover.rotation.y+=0.01
    }

}
export { Clover };