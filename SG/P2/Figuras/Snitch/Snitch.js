import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Snitch extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.translate = 0.0;
        this.rotacionW = 0.0;
        this.subeW = true;

        this.sube = true;
        this.subir = 0.0;
        
        this.aux = 0.0;
        
        var goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold color
            metalness: 0.5, // Set the metalness to 1.0
            roughness: 0.1, // Set the roughness to a low value
            clearcoat: 1.0, // Add a clearcoat layer for a more realistic appearance
            clearcoatRoughness: 0.05 // Set the clearcoat roughness to a low value
        });

        var material = new THREE.MeshStandardMaterial({
            color: 0xC0F3FF, // Light pink color
            metalness: 0.1, // Set the metalness to a low value
            roughness: 0.5, // Set the roughness to a medium value
            transparent: true, // Make the material transparent
            opacity: 0.8, // Set the opacity to 0.8
            transmission: 0.6, // Set the transmission to a high value
            side: THREE.DoubleSide, // Render the material on both sides of the face
            // Add an emission map for a glowing effect
            emissive: 0xFFFFFF,
            emissiveIntensity: 0.5,
            emissiveMap: new THREE.TextureLoader().load('path/to/emission/map.png')
        });

        var spheregeom = new THREE.SphereGeometry(2, 30, 30);

        const sphere = new THREE.Mesh(spheregeom, goldMaterial);

        var minispheregeom = new THREE.SphereGeometry(0.5,30,30);

        this.minisphere1 = new THREE.Mesh(minispheregeom, goldMaterial);
        this.minisphere1.position.set(1.7,1,0);

        this.minisphere2 = this.minisphere1.clone();
        this.minisphere2.position.set(-1.7,1,0);

        var wingShape = new THREE.Shape();
        this.createShape(wingShape);

        this.settings = {
            depth: 0.1,
            bevelEnabled: true
        };

        this.wingGeom = new THREE.ExtrudeGeometry(wingShape, this.settings);
        this.wingGeom.translate(1.5,1.5,0);

        this.wing1= new THREE.Mesh(this.wingGeom, material);
        this.wing1.scale.set(0.7,0.7,0.7);

        this.wing2 = this.wing1.clone();
        this.wing2.rotateY(180*Math.PI/180);

        this.wing1.position.set(1.9,1.2,0);
        this.wing2.position.set(-1.9,1.2,0);

        this.add(this.wing1);
        this.add(this.wing2);


        this.add(this.minisphere1);
        this.add(this.minisphere2);

        this.add(sphere);
        
        
    }

    createShape(shape)
    {
        shape.moveTo(0, -1);
        shape.bezierCurveTo(0,-1,1,0,1,0);
        shape.bezierCurveTo(1,0,1.5,1.5,1.5,1.5);
        shape.bezierCurveTo(1.5,1.5,0,0.5,0,0.5);
        shape.bezierCurveTo(0,0.5,-1.5,-1.5,-1.5,-1.5);

    }
    update()
    {
        
        if(this.subeW == true){
            this.translate=0.01;
            if(this.aux >0.1)
                this.subeW = false;
        }
        else{
            this.translate=-0.01;
            if(this.aux <-0.1)
                this.subeW = true;
        }

        this.aux += this.translate;
        this.wingGeom.translate(-this.translate, this.translate, 0);
        this.wing1.geometry.dispose();
        this.wing1.geometry= this.wingGeom;

        this.rotacionW+=0.0001;
        this.wing1.rotateX(this.rotacionW);
        this.wing2.rotateX(-this.rotacionW);

        if(this.sube && this.subir <=2.0){
            this.subir+=0.1;
            this.position.y+=0.1;
            if(this.subir >=2.0)
                this.sube = false;
        }
        else if(!this.sube && this.subir >= -2.0){
            this.subir-=0.1;
            this.position.y-=0.1;
            if(this.subir <= -2.0)
                this.sube = true;
        }


        
    }
}

export { Snitch };
