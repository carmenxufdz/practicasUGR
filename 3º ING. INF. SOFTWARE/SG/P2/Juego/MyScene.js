
// Clases de la biblioteca
// import * as THREE from "three"

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto

import { Circuito } from './Circuito.js'
import { Train } from './Train.js'

import {Apple} from './Modelos/Apple.js'
import {BadMushroom} from './Modelos/BadMushroom.js'
import {BadPotion} from './Modelos/BadPotion.js'
import {Book} from './Modelos/Book.js'
import {Coin} from './Modelos/Coin.js'
import {GoodPotion} from './Modelos/GoodPotion.js'
import {Mushroom} from './Modelos/Mushroom.js'
import {Rayo} from './Modelos/Rayo.js'
import {Ring} from './Modelos/Ring.js'
import {Skull} from './Modelos/Skull.js'
import {Snitch} from './Modelos/Snitch.js'
import {Wand} from './Modelos/Wand.js'



class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();
    
    this.reloj = new THREE.Clock();

    // variable global para cambiar de camara
    this.general = true; 
    this.tercera= false;
    this.primera = false;

    //inicializar los objetos
    //objetos voladores

    //libros
    this.books = [];
    this.numBooks = 5;
    this.bookRotaciones = [];
    this.bookInicioRotacion = [];
    //inicializa todas las rotaciones por el eje z a 0
    for (let i=0; i < this.numBooks; i++){
      this.bookInicioRotacion.push(0);
    }
    //añade una velocidad aleatoria de giro sobre el eje z
    for (let i = 0; i < this.numBooks; i++) {
      this.bookRotaciones.push(Math.random() * 0.01);
    }

    //objetos buenos

    //monedas
    this.coins = [];
    this.boxCoins = [];
    this.removedCoins = [];
    this.numCoins = 5;

    for (let i = 0; i < this.numCoins; i++) {
      this.removedCoins.push(false);
    }

    //pociones buenas
    this.goodPotions = [];
    this.boxGoodPotions = [];
    this.numGoodPotions = 1;

    //setas buenas
    this.goodMushrooms = [];
    this.boxGoodMushrooms = [];
    this.numGoodMushrooms = 1;

    //anillos
    this.rings = [];
    this.boxRings = [];
    this.numRings = 1;

    //varitas
    this.wands = [];
    this.boxWands = [];
    this.numWands = 1;

    //objetos malos

    //manzanas envenenadas
    this.apples = [];
    this.boxApples = [];
    this.numApples = 1;

    //pociones malas
    this.badPotions = [];
    this.boxBadPotions = [];
    this.numBadPotions = 1;

    //rayos
    this.lightings = [];
    this.boxLightings = [];
    this.numLightings = 2;

    //calaveras
    this.skulls = [];
    this.boxSkulls = [];
    this.numSkulls = 2;

    //setas malas
    this.badMushrooms = [];
    this.boxBadMushrooms = [];
    this.numBadMushrooms = 1;

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    this.izquierda = false;
    this.derecha = false;

    this.trenrotacion = 0;

    this.puntosLibros = 50;
    this.puntosSnitch = 1000;
    this.puntos = 0.0

    this.invencible = false;
    this.aumentoV = false;
    this.reduccionV = false;
    this.doblarPuntos = false;
    this.mitadPuntos = false;
    this.oscuro = false;

    this.velocidad = 0.001;
    
    this.time;
    this.timeContador;
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    this.objetosVoladores = []

    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCameraGeneral();
    
    // Por último creamos el modelo.

    this.cargarFondo();

    this.circuito = new Circuito (this.gui, "Controles de la Figura");
    this.add (this.circuito);

    this.train = new Train(this.gui, "Controles del Tren");
    this.add(this.train);

    this.boxTrain = new THREE.Box3();
    this.boxTrain.setFromObject(this.train);

    this.createCameraTerceraPersona();
    this.createCameraPrimeraPersona();

    this.createObjectsColisiones();

    this.createObjectsVoladores();

    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    this.createTrainFoco();
    

  }

  cargarFondo(){
    var textureLoader = new THREE.TextureLoader();
    var textura = textureLoader.load("../imgs/cielo.jpg");

    this.background = textura;
  }

  createObjectsColisiones(){

    this.pts = this.circuito.getRuta();

    this.path = new THREE.CatmullRomCurve3 (this.pts, true)

    //OBJETOS Y SUS POSICIONES
    var points = [];

    //OBJETOS BUENOS

    //MONEDAS 
    // Calcula puntos aleatorios en la curva
    
    for (let i = 0; i < this.numCoins; i++) {
        const t = Math.random();
        points.push(this.path.getPointAt(t));
    }
    
    for (let i=0; i<this.numCoins; i++){
        const coin = new Coin(this.gui, "Controles de la Figura");
        coin.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.coins.push(coin);
        this.add(coin);
        
        this.boxCoin = new THREE.Box3().setFromObject(coin);
        this.boxCoins.push(this.boxCoin);
    }

    points.length = 0;

    //POCIONES BUENAS
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numGoodPotions; i++) {
        const t = Math.random();
        points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numGoodPotions; i++){
        const goodPotion = new GoodPotion(this.gui, "Controles de la Figura");
        goodPotion.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.goodPotions.push(goodPotion);
        this.add(goodPotion);
        
        this.boxGoodPotion = new THREE.Box3().setFromObject(goodPotion);
        this.boxGoodPotions.push(this.boxGoodPotion);
    }

    points.length = 0;

    //SETAS BUENAS
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numGoodMushrooms; i++) {
        const t = Math.random();
        points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numGoodMushrooms; i++){
        const goodMushrooms = new Mushroom(this.gui, "Controles de la Figura");
        goodMushrooms.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.goodMushrooms.push(goodMushrooms);
        this.add(goodMushrooms);
        
        this.boxGoodMushroom = new THREE.Box3().setFromObject(goodMushrooms);
        this.boxGoodMushrooms.push(this.boxGoodMushroom);
    }

    points.length = 0;

    //ANILLOS
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numRings; i++) {
        const t = Math.random();
        points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numRings; i++){
        const ring = new Ring(this.gui, "Controles de la Figura");
        ring.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.rings.push(ring);
        this.add(ring);
        
        this.boxRing = new THREE.Box3().setFromObject(ring);
        this.boxRings.push(this.boxRing);
    }

    points.length = 0;

    //VARITAS
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numWands; i++) {
        const t = Math.random();
        points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numWands; i++){
        const wand = new Wand(this.gui, "Controles de la Figura");
        wand.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.wands.push(wand);
        this.add(wand);
        
        this.boxWand = new THREE.Box3().setFromObject(wand);
        this.boxWands.push(this.boxWand);
    }

    points.length = 0;

    //OBJETOS MALOS
    
    //MANZANAS ENVENENADAS
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numApples; i++) {
      const t = Math.random();
      points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numApples; i++){
        const apple = new Apple(this.gui, "Controles de la Figura");
        apple.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.apples.push(apple);
        this.add(apple);
        
        this.boxApple = new THREE.Box3().setFromObject(apple);
        this.boxApples.push(this.boxApple);
    }

    points.length = 0;

    //SETAS MALAS
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numBadMushrooms; i++) {
      const t = Math.random();
      points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numBadMushrooms; i++){
        const badMushroom = new BadMushroom(this.gui, "Controles de la Figura");
        badMushroom.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.badMushrooms.push(badMushroom);
        this.add(badMushroom);
        
        this.boxBadMushroom = new THREE.Box3().setFromObject(badMushroom);
        this.boxBadMushrooms.push(this.boxBadMushroom);
    }

    points.length = 0;

    //POCIONES MALAS 
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numBadPotions; i++) {
      const t = Math.random();
      points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numBadPotions; i++){
        const badPotion = new BadPotion(this.gui, "Controles de la Figura");
        badPotion.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.badPotions.push(badPotion);
        this.add(badPotion);
        
        this.boxBadPotion = new THREE.Box3().setFromObject(badPotion);
        this.boxBadPotions.push(this.boxBadPotion);
    }

    points.length = 0;

    //RAYOS 
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numLightings; i++) {
      const t = Math.random();
      points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numLightings; i++){
        const lighting = new Rayo(this.gui, "Controles de la Figura");
        lighting.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.lightings.push(lighting);
        this.add(lighting);
        
        this.boxLighting = new THREE.Box3().setFromObject(lighting);
        this.boxLightings.push(this.boxLighting);
    }

    points.length = 0;

    //CALAVERAS 
    // Calcula puntos aleatorios en la curva
    for (let i = 0; i < this.numSkulls; i++) {
      const t = Math.random();
      points.push(this.path.getPointAt(t));
    }

    for (let i=0; i<this.numSkulls; i++){
        const skull = new Skull(this.gui, "Controles de la Figura");
        skull.position.set(points[i].x, points[i].y + 10.25, points[i].z);
        this.skulls.push(skull);
        this.add(skull);
        
        this.boxSkull = new THREE.Box3().setFromObject(skull);
        this.boxSkulls.push(this.boxSkull);
    }

  }

  createObjectsVoladores(){

    const snitch = new Snitch(this.gui, "Controles de la Figura");
    this.objetosVoladores.push(snitch);
    this.add(snitch);

    // Coloca los libros de manera aleatoria alrededor del circuito
    for (let i = 0; i < this.numBooks; i++) {
      const book = new Book(this.gui, "Controles de la Figura");
      this.objetosVoladores.push(book);
      this.books.push(book);
      this.add(book);
    }


  }

  colisiones(){
    
    //comprobar si colisiona con alguna moneda
    for (let i = 0; i < this.boxCoins.length; i++) {
      if (this.boxTrain.intersectsBox(this.boxCoins[i]) && !this.removedCoins[i]) {
        this.removedCoins[i] = true;
        this.remove(this.coins[i]);
        this.remove(this.boxCoins[i]);
        this.train.velocidad += this.velocidad;
      }
    }

    //comprobar si colisiona con alguna pocion buena
    for (let i = 0; i < this.boxGoodPotions.length; i++) {
      if (this.boxTrain.intersectsBox(this.boxGoodPotions[i]) && !this.goodPotions[i].removed) {
        this.goodPotions[i].removed = true;
        this.remove(this.goodPotions[i]);
        this.remove(this.boxGoodPotions[i]);

        this.time = Date.now();
        this.timeContador = Date.now() - this.time;
        this.doblarPuntos = true;

      }
    }

    //comprobar si colisiona con alguna seta buena
    for (let i = 0; i < this.boxGoodMushrooms.length; i++) {
      if (this.boxTrain.intersectsBox(this.boxGoodMushrooms[i]) && !this.goodMushrooms[i].removed) {
        this.goodMushrooms[i].removed = true;
        this.remove(this.goodMushrooms[i]);
        this.remove(this.boxGoodMushrooms[i]);

        this.time = Date.now();
        this.timeContador = Date.now() - this.time;
        this.aumentoV = true;
        this.train.velocidad += this.velocidad;
      }
    }

    //comprobar si colisiona con algun anillo
    for (let i = 0; i < this.boxRings.length; i++) {
      if (this.boxTrain.intersectsBox(this.boxRings[i]) && !this.rings[i].removed) {
        this.rings[i].removed = true;
        this.remove(this.rings[i]);
        this.remove(this.boxRings[i]);
        
        this.puntos*=2;
      }
    }

    //comprobar si colisiona con alguna varita
    for (let i = 0; i < this.boxWands.length; i++) {
      if (this.boxTrain.intersectsBox(this.boxWands[i]) && !this.wands[i].removed) {
        this.wands[i].removed = true;
        this.remove(this.wands[i]);
        this.remove(this.boxWands[i]);

        this.invencible = true;
        this.time = Date.now();
        this.timeContador = Date.now() - this.time;
      }
    }

    if(!this.invencible){
      //comprobar si colisiona con alguna manzana envenenada
      for (let i = 0; i < this.boxApples.length; i++) {
        if (this.boxTrain.intersectsBox(this.boxApples[i]) && !this.apples[i].removed) {
          this.apples[i].removed = true;
          this.remove(this.apples[i]);
          this.remove(this.boxApples[i]);

          this.puntos/=2;
        }
      }

      //comprobar si colisiona con alguna seta mala
      for (let i = 0; i < this.boxBadMushrooms.length; i++) {
        if (this.boxTrain.intersectsBox(this.boxBadMushrooms[i]) && !this.badMushrooms[i].removed) {
          this.badMushrooms[i].removed = true;
          this.remove(this.badMushrooms[i]);
          this.remove(this.boxBadMushrooms[i]);
          
          this.time = Date.now();
          this.timeContador = Date.now() - this.time;
          this.reduccionV = true;

          this.train.velocidad -= this.velocidad;
        }
      }

      //comprobar si colisiona con alguna pocion mala
      for (let i = 0; i < this.boxBadPotions.length; i++) {
        if (this.boxTrain.intersectsBox(this.boxBadPotions[i]) && !this.badPotions[i].removed) {
          this.badPotions[i].removed = true;
          this.remove(this.badPotions[i]);
          this.remove(this.boxBadPotions[i]);

          this.time = Date.now();
          this.timeContador = Date.now() - this.time;
          this.mitadPuntos = true;
        }
      }

      //comprobar si colisiona con algun rayo
      for (let i = 0; i < this.boxLightings.length; i++) {
        if (this.boxTrain.intersectsBox(this.boxLightings[i]) && !this.lightings[i].removed) {
          this.lightings[i].removed = true;
          this.remove(this.lightings[i]);
          this.remove(this.boxLightings[i]);

          this.train.velocidad -= this.velocidad;
        }
      }

      //comprobar si colisiona con alguna calavera
      for (let i = 0; i < this.boxSkulls.length; i++) {
        if (this.boxTrain.intersectsBox(this.boxSkulls[i]) && !this.skulls[i].removed) {
          this.skulls[i].removed = true;
          this.remove(this.skulls[i]);
          this.remove(this.boxSkulls[i]);

          this.setAmbientIntensity(0);
          this.setLightIntensity(0);

            
          this.time = Date.now();
          this.timeContador = Date.now() - this.time;
          this.oscuro = true;
        }
      }
    }
  }

  onKeyDown = function (event){

    if(event.keyCode == 65){ // A
      this.izquierda = true;
    }
    if(event.keyCode == 68){ // D
      this.derecha = true;
    }
  }

  onKeyPress = function (event){
    if (event.keyCode === 32) { // 32 es el código de la tecla de la barra espaciadora
      if (this.general){
         this.general = !this.general;
         this.tercera  = !this.tercera;
      }
      else if (this.tercera){
        this.tercera = !this.tercera;
        this.primera  = !this.primera;
      }
      else if(this.primera){
        this.primera = !this.primera;
        this.general  = !this.general;
      }
    }
  }

  onDocumentMouseDown(event) {
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    // Reutilizamos esos objetos, evitamos construirlos en cada pulsación
    // Se obtiene la posición del clic

    // en coordenadas de dispositivo normalizado
    // - La esquina inferior izquierda tiene la coordenada (-1, -1)
    // - La esquina superior derecha tiene la coordenada (1, 1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    // Se actualiza un rayo que parte de la cámara (el ojo del usuario)
    // y que pasa por la posición donde se ha hecho clic
    this.raycaster.setFromCamera(this.mouse, this.cameratercerapers);

    // Hay que buscar qué objetos intersecan con el rayo
    // Es una operación costosa, solo se buscan intersecciones
    // con los objetos que interesan en cada momento
    // Las referencias de dichos objetos se guardan en un array
    // pickableObjects vector de objetos donde se van a buscar intersecciones con el rayo
    // pickedObjects vector donde se almacenan los Meshes intersecados por el rayo
    // ordenado desde el más cercano a la cámara hasta el más lejano
    
    var pickedObjects = this.raycaster.intersectObjects(this.objetosVoladores, true);

    // El parámetro true indica que se deben buscar intersecciones en los nodos del vector y sus descendientes
    if (pickedObjects.length > 0) { // hay algún Mesh clicado
      // Se puede referenciar el Mesh clicado
      var selectedObject = pickedObjects[0].object;

      // Mostrar por consola el objeto que se selecciona y el punto en el que se ha seleccionado
      console.log('Objeto seleccionado:', selectedObject);
      console.log('Punto de intersección:', pickedObjects[0].point);

      
      // Identificar cuál de los objetos de pickableObjects ha sido seleccionado MEDIANTE ID (NO FUNCIONA PORQ NO COINCIDEN)
      for (let i = 0; i < this.objetosVoladores.length; i++) {
        console.log('Comparando:', this.objetosVoladores[i], 'con', selectedObject);
        if (this.objetosVoladores[i].uuid === selectedObject.parent.uuid) {
            console.log('El objeto seleccionado es:', this.objetosVoladores[i]);
            if(this.objetosVoladores[i] == this.objetosVoladores[0]){
              // PUNTOS SNITCH
              if(this.mitadPuntos){
                this.puntos += this.puntosSnitch/2;
              }
              else if(this.doblarPuntos){
                this.puntos += this.puntosSnitch*2;
              }
              else
                this.puntos += this.puntosSnitch;
            }
            else{

              // PUNTOS LIBROS
              if(this.mitadPuntos){
                this.puntos += this.puntosLibros/2;
              }
              else if(this.doblarPuntos){
                this.puntos += this.puntosLibros*2;
              }
              else
                this.puntos += this.puntosLibros;
            }
            
            // Eliminar el objeto seleccionado de la escena
            this.remove(this.objetosVoladores[i]);

            // Eliminar el objeto de pickableObjects
            this.objetosVoladores.splice(i, 1);
            break;
        }
      }
    }
  }

  setMessagePoints(str) {
    document.getElementById("Points").innerHTML = "<h2>" + "Puntos: " + str + "</h2>";
  }


  createCameraGeneral () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camerageneral = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    // También se indica dónde se coloca
    this.camerageneral.position.set (20, 10, 20);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camerageneral.lookAt(look);
    this.add (this.camerageneral);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.camerageneralControl = new TrackballControls (this.camerageneral, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    this.camerageneralControl.rotateSpeed = 5;
    this.camerageneralControl.zoomSpeed = -2;
    this.camerageneralControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.camerageneralControl.target = look;
  }

  createCameraTerceraPersona () { //camara subjetiva

    this.cameratercerapers = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5000);

    this.train.add (this.cameratercerapers);
    this.cameratercerapers.position.set(0,125,-100);

    var puntoDeMiraRelativo = new THREE.Vector3 (0,0,2.5);

    var target = new THREE.Vector3();
    this.cameratercerapers.getWorldPosition(target);
    target.add(puntoDeMiraRelativo);

    this.cameratercerapers.lookAt(target);
  }

  
  createCameraPrimeraPersona () { //camara subjetiva

    this.cameratren = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5000);

    this.train.add (this.cameratren);
    this.cameratren.position.set(0,110.1,0);

    var puntoDeMiraRelativo = new THREE.Vector3 (0,0,5);

    var target = new THREE.Vector3();
    this.cameratren.getWorldPosition(target);
    target.add(puntoDeMiraRelativo);

    this.cameratren.lookAt(target);
  }
  
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (0.5,0.02,0.5);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshStandardMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.01;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lighIntensity : 15,  // La potencia de esta fuente de luz se mide en lúmenes
      spotLight1Power: 50,
      trainLight: 50,
      ambientIntensity : 0.35,
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lighIntensity', 0, 30, 1)
      .name('Luz Direccional : ')
      .onChange ( (value) => this.setLightIntensity(value) );
    
    folder.add (this.guiControls, 'spotLight1Power', 0, 100, 1)
      .name('Luz Puntual 1 : ')
      .onChange ( (value) => this.setSpotLight1Power(value) );

    folder.add (this.guiControls, 'trainLight', 0, 100, 1)
      .name('Luz Tren : ')
      .onChange ( (value) => this.setTrainLight(value) );
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ')
      .onChange ( (value) => this.setAmbientIntensity(value) );
      
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.luz1 = new THREE.DirectionalLight( 0xffffff,  this.guiControls.lighIntensity);
    this.luz1.position.set( 0, 200, 50 );
    this.add (this.luz1);

    this.luz2 = new THREE.DirectionalLight( 0xffffff,  this.guiControls.lighIntensity);
    this.luz2.position.set( 0, -200, 50 );
    this.add (this.luz2);

  }

  createTrainFoco() {
    // Crear la luz spot de color amarillo con mayor intensidad
    var leftHeadlight = new THREE.SpotLight(0xffff00, 10);
    leftHeadlight.position.set(0, 110.1, 0);

    // Configurar el ángulo de apertura de la luz
    leftHeadlight.angle = Math.PI / 6;  // Ajusta el ángulo según sea necesario
    leftHeadlight.penumbra = 0.1;       // Suaviza los bordes de la luz
    leftHeadlight.decay = 2;            // Decay (atenuación) de la luz
    leftHeadlight.distance = 4000;       // Distancia máxima de la luz

    // Crear un objeto para el objetivo de la luz
    this.targetObject = new THREE.Object3D();
    this.targetPosition = new THREE.Vector3(0, 0.5, 0);
    this.targetObject.position.copy(this.targetPosition);

    // Agregar la luz y el objetivo al tren
    this.train.add(leftHeadlight);
    this.train.add(this.targetObject);

    // Configurar la luz para que apunte al objetivo
    leftHeadlight.target = this.targetObject;

    // Para asegurarte de que la luz se actualice correctamente
    this.add(leftHeadlight.target); 
  }

  updateTrainLights() {
    // Obtener la dirección hacia adelante del tren
    var forwardVector = new THREE.Vector3(0, 0, 1);
    forwardVector.applyQuaternion(this.train.quaternion);
    
    // Actualizar la posición del objetivo
    this.targetObject.position.copy(this.train.position).add(forwardVector.multiplyScalar(100)); // Ajusta el escalar según sea necesario
  }

  setLightIntensity (valor) {
    this.luz1.intensity = valor;
    this.luz2.intensity = valor;
  }

  setSpotLight1Power(valor){
    this.spotLight1.power = valor;
  }

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  

  setTrainLight(valor){
    this.trainLight.power = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    if (this.general == true)
      return this.camerageneral;
    else if (this.tercera == true)
      return this.cameratercerapers;
    else (this.primera == true)
      return this.cameratren;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    if (this.general == true){
      this.camerageneral.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.camerageneral.updateProjectionMatrix();
    }
    if (this.tercera == true){
      this.cameratercerapers.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.cameratercerapers.updateProjectionMatrix();
    }
    if (this.primera == true){
      this.cameratren.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.cameratren.updateProjectionMatrix();
    }

  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    if (this.general == true){
      var camara = this.camerageneral;
      var nuevaRatio = window.innerWidth / window.innerHeight;
      camara.aspect = nuevaRatio;
    }
    if (this.tercera == true){
      var camara = this.cameratercerapers;
      var nuevaRatio = window.innerWidth / window.innerHeight;
      camara.aspect = nuevaRatio;
    }
    if (this.primera == true){
      var camara = this.cameratren;
      var nuevaRatio = window.innerWidth / window.innerHeight;
      camara.aspect = nuevaRatio;
    }
    camara.updateProjectionMatrix();
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualiza la posición de la cámara según su controlador
    if (this.general == true)
      this.camerageneralControl.update();

    this.updateTrainLights();

    this.circuito.update();

    this.train.update();

    for(let i = 0; i<this.objetosVoladores.length; i++)
      this.objetosVoladores[i].update();
    

    if(this.izquierda)
      this.trenrotacion -=0.1;

    if(this.derecha)
      this.trenrotacion +=0.1;

    this.train.rotateZ(this.trenrotacion);
    
    //GIRA LOS LIBROS ALREDEDOR DEL CIRCUITO
    for(let i = 0; i<this.books.length; i++){
      this.books[i].rotateZ(this.bookRotaciones[i]);
    }

    this.izquierda = false;
    this.derecha = false;

    this.boxTrain.setFromObject(this.train);

    this.colisiones();

    if(this.invencible && this.timeContador < 20000){
      this.timeContador = Date.now() - this.time;
    }
    else{
      this.invencible = false;
    }
  
    if(this.mitadPuntos && this.timeContador < 15000){
      this.timeContador = Date.now() - this.time;
    }
    else{
      this.mitadPuntos = false;
    }

    if(this.doblarPuntos && this.timeContador < 15000){
      this.timeContador = Date.now() - this.time;
    }
    else{
      this.doblarPuntos = false;
    }


    if(this.aumentoV && this.timeContador < 15000){
      this.timeContador = Date.now() - this.time;
    }
    else if(this.aumentoV && this.timeContador > 15000){
      this.aumentoV = false;
      this.train.velocidad -= this.velocidad;
    }


    if(this.reduccionV && this.timeContador < 15000){
      this.timeContador = Date.now() - this.time;
    }
    else if(this.reduccionV && this.timeContador > 15000){
      this.reduccionV = false;
      this.train.velocidad += this.velocidad;
    }

    
    if(this.oscuro && this.timeContador < 20000){
      this.timeContador = Date.now() - this.time;
    }
    else if(this.oscuro && this.timeContador > 20000){
      this.oscuro = false;
      this.setAmbientIntensity(1);
      this.setLightIntensity(15);
    }

    this.setMessagePoints(this.puntos);

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
  
}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));  
  window.addEventListener ("keypress", (event) => scene.onKeyPress(event));
  window.addEventListener ("mousedown", (event) => scene.onDocumentMouseDown(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();

});
