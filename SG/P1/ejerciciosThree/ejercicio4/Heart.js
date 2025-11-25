import * as THREE from '../libs/three.module.js'
 
class Heart extends THREE.Object3D {
  constructor(gui, titleGui)
  {
      super();

      var shape = new THREE.Shape();
      this.createShape(shape);

      this.settings = {
          steps: 10, // — int. Number of points used for subdividing segments along the depth of the extruded spline
          depth: 0.5, // — float. Depth to extrude the shape
          bevelEnabled: true, // — bool. Apply beveling to the shape
          bevelThickness: 1,// — float. How deep into the original shape the bevel goes
          bevelSize: 1, //  float. Distance from the shape outline that the bevel extends
          bevelSegments: 5 // — int. Number of bevel layers
      };

      var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
      var material = new THREE.MeshPhysicalMaterial( { color: 0xcf0000 } ); // rojo

      this.heart = new THREE.Mesh(geometry, material);
      

      this.add( this.heart );
      this.position.y += 3;
  }

  createShape(shape)
  {
    shape.moveTo(0.0,0.0);
    shape.quadraticCurveTo( 3, 3, 1.5, 4); 
    shape.quadraticCurveTo( 0.75, 5, 0, 3);
    shape.quadraticCurveTo( -0.75, 5, -1.5, 4); 
    shape.quadraticCurveTo( -3, 3, 0, 0);
  }

  update()
  {
    this.heart.rotation.y+=0.01;
  }
}



export { Heart };