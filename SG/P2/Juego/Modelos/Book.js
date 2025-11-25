import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'
import { Circuito } from '../Circuito.js';

class Book extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.sube - true;

        this.subir = 0.0;

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('../../imgs/paper.jpg');

        var coverMaterial = new THREE.MeshStandardMaterial( { 
            color: 0x003F77,
            roughness: 0.5,
            metalness: 0,
        } ); // amarillo

        var pageMaterial = new THREE.MeshStandardMaterial({
            color: 0xBDBDBD, // white color
            roughness: 0.5, // roughness value
            metalness: 0, // metalness value
            side: THREE.DoubleSide, // double-sided material
            map: texture
        });

        var tapageom = new THREE.BoxGeometry(2,3,0.25);
        this.tapa = new THREE.Mesh(tapageom,coverMaterial);
        this.tapa2 = this.tapa.clone();

        this.tapa.rotateX(90*Math.PI/180);
        this.tapa.rotateY(-30*Math.PI/180);
        this.tapa.position.set(1,0,0);

        this.tapa2.rotateX(90*Math.PI/180);
        this.tapa2.rotateY(30*Math.PI/180);
        this.tapa2.position.set(-1,0,0);

        var uniongeom = new THREE.BoxGeometry(0.5,3,0.25);
        this.union = new THREE.Mesh(uniongeom,coverMaterial);
        this.union.rotateX(90*Math.PI/180);
        this.union.position.set(0,0.5,0);

        var pagegeom = new THREE.BoxGeometry(1.9,2.8,0.5);
        this.page1 = new THREE.Mesh(pagegeom,pageMaterial);
        this.page2 = this.page1.clone();

        this.page1.rotateX(90*Math.PI/180);
        this.page1.rotateY(30*Math.PI/180);
        this.page1.position.set(-0.8,-0.1,0);

        this.page2.rotateX(90*Math.PI/180);
        this.page2.rotateY(-30*Math.PI/180);
        this.page2.position.set(0.8,-0.1,0);

        
        this.add(this.tapa);
        this.add(this.page1);
        this.add(this.tapa2);
        this.add(this.page2);
        this.add(this.union);

        this.scale.set(0.7,0.7,0.7);


        this.path = []; // Initialize the path array

        // Create the path using the Circuito class
        const circuito = new Circuito(gui, titleGui);
        this.path = circuito.getRuta();
        
        // Create the CatmullRomCurve3 object
        this.curve = new THREE.CatmullRomCurve3(this.path);

        this.tiempoDeRecorrido = Math.floor(Math.random() * 70000) + 30000; // random etre 3 y 10 segundos
        this.segmentos = 100; // Initialize the number of segments
        this.binormales = this.curve.computeFrenetFrames(this.segmentos, true).binormals; // Initialize the binormals array      

        var origen = {t:Math.random()}; //empieza en un sitio del circuito aleatorio
        
        this.altura = Math.floor(Math.random() * 21) + 20; // rand entre 20 y 40
        this.book = [this.tapa, this.page1, this.tapa2, this.page2, this.union]
        for(let i=0; i<this.book.length; i++){
          this.book[i].position.y += this.altura
        }
        
        this.velocidadSubida = Math.random() * 0.09 + 0.01; // rand ENTRE 0.01 Y 0.1
        

    
        var posicion = this.curve.getPointAt(origen.t);
        this.position.copy(posicion);
        var tangente = this.curve.getTangentAt(origen.t);
        posicion.add(tangente);
        this.up + this.binormales[Math.floor(origen.t * this.segmentos)];



        //NO SE PORQ SOLO ME HACE LA SEGUNDA Y NO LAS DOS A LA VEZ 

    }


    update()
    {
        
        if(this.sube && this.subir <=2.0){
            this.subir += this.velocidadSubida;
            this.position.y += this.velocidadSubida;
            if(this.subir >= 2.0)
                this.sube = false;
        }
        else if(!this.sube && this.subir >= -2.0){
            this.subir-= this.velocidadSubida;
            this.position.y-= this.velocidadSubida;
            if(this.subir <= -2.0)
                this.sube = true;
        }
        //TWEEN.update();
    }
}

export { Book };