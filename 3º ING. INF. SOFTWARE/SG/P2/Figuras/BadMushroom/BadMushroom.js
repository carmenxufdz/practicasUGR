import * as THREE from '../../libs/three.module.js'

class BadMushroom extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        //this.createGUI(gui,titleGui);

        var texture = new THREE.TextureLoader().load('../../imgs/setaMala.jpg');
        var setaMalaMat = new THREE.MeshPhongMaterial ({map: texture});

        var baseMat = new THREE.MeshPhongMaterial({color: 0xD2B48C});


        var base = [];
        var sombreroMalo = [];
        var sombreroBueno = [];

        //añadimos los puntos
        this.createBase(base);
        this.createSombreroMalo(sombreroMalo);

        //creamos la geometria
        var GeometryBase = new THREE.LatheGeometry(base,10);
        var GeometrySombreroMalo = new THREE.LatheGeometry(sombreroMalo,10);
        
        GeometryBase.translate(0,-2,0)
        GeometryBase.scale(0.3,0.3,0.3)

        //creamos los MESH
        var meshBase = new THREE.Mesh(GeometryBase, baseMat);
        var meshSombreroMalo = new THREE.Mesh(GeometrySombreroMalo, setaMalaMat);
        
        this.add (meshBase);
        this.add (meshSombreroMalo);
    }

    createBase(base){
        base.push (new THREE.Vector3 (0, 0, 0));
        base.push (new THREE.Vector3 (0.25, 0.1, 0));
        base.push (new THREE.Vector3 (0.5, 0.2, 0));
        base.push (new THREE.Vector3 (0.75, 0.3, 0));
        base.push (new THREE.Vector3 (1, 0.5, 0));
        base.push (new THREE.Vector3 (1, 5.5, 0));
        base.push (new THREE.Vector3 (0.75, 5.6, 0));
        base.push (new THREE.Vector3 (0.5, 5.7, 0));
        base.push (new THREE.Vector3 (0.25, 5.8, 0));
        base.push (new THREE.Vector3 (0, 6, 0));
    }

    createSombreroMalo(sombreroMalo){
        sombreroMalo.push (new THREE.Vector3 (0, 1, 0));
        sombreroMalo.push (new THREE.Vector3 (0.1, 1.1, 0));
        sombreroMalo.push (new THREE.Vector3 (0.2, 1.25, 0));
        sombreroMalo.push (new THREE.Vector3 (0.3, 1.1, 0));
        sombreroMalo.push (new THREE.Vector3 (0.5, 1, 0));
        sombreroMalo.push (new THREE.Vector3 (0.6, 0.75, 0));
        sombreroMalo.push (new THREE.Vector3 (0.7, 0.5, 0));
        sombreroMalo.push (new THREE.Vector3 (0.8, 0.75, 0));
        sombreroMalo.push (new THREE.Vector3 (1, 1, 0));
        sombreroMalo.push (new THREE.Vector3 (0.8, 1.5, 0));
        sombreroMalo.push (new THREE.Vector3 (0.6, 2.25, 0));
        sombreroMalo.push (new THREE.Vector3 (0.4, 2.6, 0));
        sombreroMalo.push (new THREE.Vector3 (0.2, 2.8, 0));
        sombreroMalo.push (new THREE.Vector3 (0, 3, 0));
    }

    update()
    {
    }
    
}

export { BadMushroom };
