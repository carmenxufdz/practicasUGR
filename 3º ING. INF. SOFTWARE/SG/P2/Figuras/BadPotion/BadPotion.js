import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'

class BadPotion extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../../imgs/corcho.jpg');

        var glasspoints = [];

        this.createGlass(glasspoints);

        var glassmaterial = new THREE.MeshPhysicalMaterial({
            roughness: 0.5,
            transmission: 1,
            thickness: 0.5,
            transparent: true,
            opacity: 0.6,
            refractionRatio: 0.95,
            color: 0xffffff,
            metalness: 0,
            clearcoat: 0,
            clearcoatRoughness: 0,
            envMapIntensity: 1
          });

        var liquidmaterial = new THREE.MeshPhysicalMaterial({
            color: 0x007703,
            transmission: 1, // Transparency value
            opacity: 0.8, // Transparency value
            roughness: 0.5, // Roughness value
            metalness: 0.25, // Metalness value
            shininess : 50,
        });

        var corchomaterial = new THREE.MeshBasicMaterial({
            color: 0xCD9573,
            roughness: 0.8, // alta rugosidad
            metalness: 0, // baja metalicidad
            specularIntensity: 0,
            emissiveIntensity: 0,
            map: texture
        });
        var crystal = new THREE.Mesh(new THREE.LatheGeometry(glasspoints,20),glassmaterial);

        var holepoints = [];

        this.createHole(holepoints);

        var hueco = new THREE.Mesh(new THREE.LatheGeometry(holepoints,20),glassmaterial);

        hueco.scale.set(0.9,1,0.9);
        hueco.position.y=0.01;

        var liquidpoints = [];
        this.createLiquid(liquidpoints);

        var liquid = new THREE.Mesh(new THREE.LatheGeometry(liquidpoints, 20), liquidmaterial);
        liquid.scale.set(0.8,1,0.8);

        var corchogeom = new THREE.CylinderGeometry(0.7,0.4,0.8);
        var corcho = new THREE.Mesh(corchogeom, corchomaterial);
        corcho.position.y=+2.9;

        const tarro = new CSG();
        tarro.union([crystal]);
        tarro.subtract([hueco]);

        var potion = tarro.toMesh();
    
        this.add(corcho);
        this.add(liquid);

        this.add(potion);
        
    }

    createGlass(points)
    {
        points.push(new THREE.Vector3(0.0001,-3,0));
        points.push(new THREE.Vector3(1.5,-3,0));
        
        points.push(new THREE.Vector3(1.5,2,0));

        points.push(new THREE.Vector3(0.6,2.8,0));
        points.push(new THREE.Vector3(0.8,2.8,0));
        points.push(new THREE.Vector3(0.8,3,0));
        points.push(new THREE.Vector3(0.0001,3,0));
    }

    createHole(points){
        
        points.push(new THREE.Vector3(0.0001,-3,0));
        points.push(new THREE.Vector3(1.4,-3,0));
        
        points.push(new THREE.Vector3(1.4,2,0));


        points.push(new THREE.Vector3(0.6,2.8,0));
        points.push(new THREE.Vector3(0.6,3,0));
        points.push(new THREE.Vector3(0.001,3,0));
    }

    createLiquid(points)
    {
        points.push(new THREE.Vector3(0.0001,-2.8,0));
        points.push(new THREE.Vector3(1.4,-2.8,0));
        
        points.push(new THREE.Vector3(1.4,1.5,0));
        points.push(new THREE.Vector3(0.0001,1.5,0));

    }
    update()
    {
    }
}

export { BadPotion };
