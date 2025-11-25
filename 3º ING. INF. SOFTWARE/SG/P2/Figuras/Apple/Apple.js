import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Apple extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();
        
        var raboMat = new THREE.MeshPhongMaterial({color: 0x4a804d});
        var manzanaMat = new THREE.MeshPhongMaterial({color: 0xb42c1c});
        var mordidaMat = new THREE.MeshPhongMaterial({color: 0xecb477});

        var shape = new THREE.Shape();
        this.createShape(shape);

        var options = {
            depth: 0
            /*
            steps: 2,
            curveSegments: 6,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 2
            */
        }

        var manzana= [];

        //añadimos los puntos
        this.createManzana(manzana);

        //creamos la geometria
        var GeometryRabo = new THREE.ExtrudeGeometry(shape,options);
        var GeometryManzana = new THREE.LatheGeometry(manzana,10);
        var GeometryMordida = new THREE.SphereGeometry(1.1,10,10);
        var GeometryMordida2 = new THREE.SphereGeometry(1,10,10);
        
        GeometryRabo.translate(0,3.5,0)
        //GeometryMordida.rotateZ(-45*Math.PI/180)
        //GeometryMordida2.rotateZ(-45*Math.PI/180)
        GeometryMordida.translate(1.55,2.55,0)
        GeometryMordida2.translate(2.25,2.7,0)

        //creamos los MESH
        var meshRabo = new THREE.Mesh(GeometryRabo, raboMat);
        var meshManzana = new THREE.Mesh(GeometryManzana, manzanaMat);
        var meshMordida = new THREE.Mesh(GeometryMordida, mordidaMat);
        var meshMordida2 = new THREE.Mesh(GeometryMordida2, mordidaMat);
        
        
        var csg = new CSG();
        //csg.union([meshManzana, meshRabo,meshMordida])
        //csg.subtract([meshManzana,meshMordida2])
        //csg.subtract([meshMordida, meshMordida2])
        csg.subtract([meshManzana, meshMordida2])

        var resultadoMesh = new THREE.Mesh()

        resultadoMesh = csg.toMesh()

        var csg2 = new CSG();
        //csg.union([meshManzana, meshRabo,meshMordida])
        //csg.subtract([meshManzana,meshMordida2])
        csg2.subtract([meshMordida, meshMordida2])

        var resultadoMesh2 = new THREE.Mesh()

        resultadoMesh2 = csg2.toMesh()
        
        this.add(meshRabo);
        this.add(resultadoMesh);
        this.add(resultadoMesh2);
        
    }

    createManzana(manzana){
        manzana.push (new THREE.Vector3 (0, 0.5, 0));
        manzana.push (new THREE.Vector3 (0.1, 0.4, 0));
        manzana.push (new THREE.Vector3 (0.2, 0.2, 0));
        manzana.push (new THREE.Vector3 (0.3, 0, 0));
        manzana.push (new THREE.Vector3 (0.7, 0.2, 0));
        manzana.push (new THREE.Vector3 (1,0.3, 0));
        manzana.push (new THREE.Vector3 (1.25,0.5, 0));
        manzana.push (new THREE.Vector3 (1.75,0.8, 0));
        manzana.push (new THREE.Vector3 (2, 1.25, 0));
        manzana.push (new THREE.Vector3 (2.25, 1.75, 0));
        manzana.push (new THREE.Vector3 (2.5, 2.5, 0));
        manzana.push (new THREE.Vector3 (2.4,3, 0));
        manzana.push (new THREE.Vector3 (2.2,3.25, 0));
        manzana.push (new THREE.Vector3 (2,3.4, 0));
        manzana.push (new THREE.Vector3 (1.8, 3.6, 0));
        manzana.push (new THREE.Vector3 (1.5, 3.75, 0));
        manzana.push (new THREE.Vector3 (1, 3.9, 0));
        manzana.push (new THREE.Vector3 (0, 4, 0));
        manzana.push (new THREE.Vector3 (0, 0.5, 0));

    }
    
    createShape(shape){
        shape.moveTo(0,0)
        shape.lineTo(0.2,0)
        shape.quadraticCurveTo(0.2,1.8,1.5,1.8)
        shape.lineTo(1.15,1.85)
        shape.lineTo(1.3,2)
        shape.quadraticCurveTo(0,2,0,0)
    }

    update()
    {
    }
}

export { Apple };
