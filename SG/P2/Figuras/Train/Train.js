import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Train extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

          this.createLocomotor();
          this.createCamara();
          this.createBase();
          this.createRuedas();

          this.train = [this.locomotor, this.camara, this.base, this.ruedas]
          for(let i=0; i<this.train.length; i++)
            this.train[i].position.y +=10;
          this.rotacion = 0.01;


    }

    createLocomotor(){
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load('../../imgs/pintura.jpg');

      var material = new THREE.MeshStandardMaterial({
        color: 0x830000,
        roughness: 0.1,
        metalness: 0.6,
        map: texture
      });

      /* LOCOMOTOR */
      var cylindergeom = new THREE.CylinderGeometry(5, 5, 17.5, 30);

      const cylinder = new THREE.Mesh(cylindergeom, material);
      cylinder.rotateZ(90*Math.PI/180); // Rot
      cylinder.rotateX(90*Math.PI/180); // Rot

      var cygeom = new THREE.CylinderGeometry(1.25, 1.25, 2.5, 30);

      const cy = new THREE.Mesh(cygeom, material);
      cy.position.set(0,6,6);

      var locomotorCSG = new CSG();
      locomotorCSG.union([cylinder, cy]);

      this.locomotor = locomotorCSG.toMesh();

      this.add(this.locomotor);
    }

    createCamara(){
      
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load('../../imgs/pintura.jpg');

        var material = new THREE.MeshStandardMaterial({
          color: 0x830000,
          roughness: 0.1,
          metalness: 0.6,
          map: texture
        });
        /* CAMARA DEL TREN */
        var boxgeom = new THREE.BoxGeometry(10,12,10);

        const box = new THREE.Mesh(boxgeom, material);
        box.position.y = 3;
        box.position.z = -13.75;

        var soportegeom = new THREE.BoxGeometry(12,1,10);

        const soporte = new THREE.Mesh(soportegeom, material);
        soporte.position.y = -3.5;
        soporte.position.z = -13.75;

        const soporte2 = soporte.clone();
        soporte2.position.y = 8.5;
        soporte2.position.z = -13.75;

        var techogeom = new THREE.CylinderGeometry(4, 7, 2.5, 4);

        const techo = new THREE.Mesh(techogeom, material);
        techo.rotateY(45*Math.PI/180);
        techo.position.set(0, 10.25,-13.75);

        var camaraCSG = new CSG();
        camaraCSG.union([box, soporte, soporte2, techo]);

        this.camara = camaraCSG.toMesh();

        this.add(this.camara);
    }

    createBase(){
      var textureLoader = new THREE.TextureLoader();
      var acero = textureLoader.load('../../imgs/acero.jpg');

      const aceromaterial = new THREE.MeshStandardMaterial({
        color: 0x111111, // Base color of the wheel
        roughness: 0.5, // Add some roughness to give it a worn look
        metalness: 0.2, // Add some metalness to give it a slight shine
        bumpMap: acero,
        bumpScale: 0.5,
        aoMapIntensity: 0.5,
        envMapIntensity: 0.5
      });
        
      var boxinfgeom = new THREE.BoxGeometry(2.5, 2.5 , 29);

      const boxinf = new THREE.Mesh(boxinfgeom, aceromaterial);
      boxinf.position.set(3.75, -5, -4.25);

      const boxinf2 = boxinf.clone();
      boxinf2.position.set(-3.75, -5, -4.25);

      var boxsoportgeom = new THREE.BoxGeometry(10,1.5,1.5);
      const boxsoport = new THREE.Mesh(boxsoportgeom, aceromaterial);
      boxsoport.position.set(0, -5, -17);
      const boxsoport2 = boxsoport.clone();
      boxsoport2.position.set(0, -5, 9);

      var baseCSG = new CSG();
      baseCSG.union([boxinf, boxinf2, boxsoport, boxsoport2]);

      this.base = baseCSG.toMesh();

      this.add(this.base);


    }

    createRuedas(){
      var textureLoader = new THREE.TextureLoader();
      var acero = textureLoader.load('../../imgs/acero.jpg');

      const aceromaterial = new THREE.MeshStandardMaterial({
        color: 0x111111, // Base color of the wheel
        roughness: 0.5, // Add some roughness to give it a worn look
        metalness: 0.2, // Add some metalness to give it a slight shine
        bumpMap: acero,
        bumpScale: 0.5,
        aoMapIntensity: 0.5,
        envMapIntensity: 0.5
      });

       var ruedaGgeom = new THREE.CylinderGeometry(3,3,1, 30);

      const ruedaG1 = new THREE.Mesh(ruedaGgeom, aceromaterial);
      ruedaG1.rotateX(90*Math.PI/180);
      ruedaG1.rotateZ(90*Math.PI/180);
      ruedaG1.position.set(5.5, -5, -14);
      
      const ruedaG2 = ruedaG1.clone();
      ruedaG2.position.set(-5.5, -5, -14);
      
      const ruedaG3 = ruedaG1.clone();
      ruedaG3.position.set(5.5, -5, -7);
      
      const ruedaG4 = ruedaG1.clone();
      ruedaG4.position.set(-5.5, -5, -7);
      
      var ruedaPgeom = new THREE.CylinderGeometry(2,2,1, 30);
      
      const ruedaP1 = new THREE.Mesh(ruedaPgeom, aceromaterial);
      ruedaP1.rotateX(90*Math.PI/180);
      ruedaP1.rotateZ(90*Math.PI/180);
      ruedaP1.position.set(5.5, -6, 5);
      
      const ruedaP2 = ruedaP1.clone();
      ruedaP2.position.set(-5.5, -6, 5);
      
      var ruedasCSG = new CSG();
      ruedasCSG.union([ruedaG1,ruedaG2, ruedaG3, ruedaG4, ruedaP1, ruedaP2]);
      
      this.ruedas = ruedasCSG.toMesh();
      

      this.add(this.ruedas);

    }

    update()
    {
    }
}

export { Train };
