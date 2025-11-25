import * as THREE from '../../libs/three.module.js'


class Mushroom extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        //this.createGUI(gui,titleGui);

        // Puntos
        /*
        var shape = new THREE.Shape();
        this.createShape(shape);

        var options = {
            depth: 1
            //steps: 2,
            //curveSegments: 6,
            //bevelThickness: 2,
            //bevelSize: 1,
            //bevelSegments: 2
        }

        var geometry = new THREE.ExtrudeGeometry (shape, options);
        */

        var texture = new THREE.TextureLoader().load('../../imgs/setaBuena2.jpg');
        var setaBuenaMat = new THREE.MeshPhongMaterial ({map: texture});
        var baseMat = new THREE.MeshPhongMaterial({color: 0xD2B48C});


        var base = [];
        var sombreroBueno = [];

        //añadimos los puntos
        this.createBase(base);
        this.createSombreroBueno(sombreroBueno);

        //creamos la geometria
        var GeometryBase = new THREE.LatheGeometry(base,10);
        var GeometrySombreroBueno = new THREE.LatheGeometry(sombreroBueno,10);
        
        GeometryBase.scale(0.65,0.65,0.65)
        GeometryBase.translate(0,-2.5,0)

        //creamos los MESH
        var meshBase = new THREE.Mesh(GeometryBase, baseMat);
        var meshSombreroBueno = new THREE.Mesh(GeometrySombreroBueno, setaBuenaMat);
        
        this.add (meshBase);;
        this.add (meshSombreroBueno);
        
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

    createSombreroBueno(sombreroBueno){
        sombreroBueno.push (new THREE.Vector3 (0, 1, 0));
        sombreroBueno.push (new THREE.Vector3 (0.25, 1.1, 0));
        sombreroBueno.push (new THREE.Vector3 (0.75, 1.2, 0));
        sombreroBueno.push (new THREE.Vector3 (1.25, 1.1, 0));
        sombreroBueno.push (new THREE.Vector3 (1.5, 1, 0));
        sombreroBueno.push (new THREE.Vector3 (1.75, 0.5, 0));
        sombreroBueno.push (new THREE.Vector3 (2.5, 0.25, 0));
        sombreroBueno.push (new THREE.Vector3 (2.75, 0.5, 0));
        sombreroBueno.push (new THREE.Vector3 (3, 1, 0));
        sombreroBueno.push (new THREE.Vector3 (2.75, 1.3, 0));
        sombreroBueno.push (new THREE.Vector3 (2.5, 1.6, 0));
        sombreroBueno.push (new THREE.Vector3 (2, 2, 0));
        sombreroBueno.push (new THREE.Vector3 (1.25, 2.3, 0));
        sombreroBueno.push (new THREE.Vector3 (0, 2.5, 0));
    }
    update()
    {
    }
}

export { Mushroom };
