/**
 * Created by Robin on 04/08/17.
 */

// Printer bounding bx vars
var printerX = 196.61;
var printerY= 147.46;
var printerZ = 220;

// init scene
var scene = new THREE.Scene();

//camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 300);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera)

// camera controls
var controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 10;
controls.zoomSpeed = 5;
controls.panSpeed = 2;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
controls.addEventListener( 'change', render );

// init renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


 // create bounding box 3Dprinter
 var ColourBoundingBox = new THREE.LineBasicMaterial({ color: 0x938A8A });
 var BoundingBox = new THREE.Geometry();
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, -printerY/2, 0));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, -printerY/2, 0));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, printerY/2, 0));
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, printerY/2, 0));
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, -printerY/2, 0));
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, -printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, -printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, -printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(-printerX/2, printerY/2, 0));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, printerY/2, 0));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, -printerY/2, printerZ));
 BoundingBox.vertices.push(new THREE.Vector3(printerX/2, -printerY/2, 0));
 var line = new THREE.Line(BoundingBox, ColourBoundingBox);
 scene.add(line);


// import stl into three.js
// create loader
var loader = new THREE.STLLoader();

// create object
var object = new THREE.Object3D()
loader.load( '../stl/slotted_disk2.stl', function ( geometry ) {
    var material=new THREE.MeshLambertMaterial({ color: 0xfdd017 });
    object = new THREE.Mesh(geometry, material);
    scene.add(object);
});


// lights
scene.add(new THREE.AmbientLight(0x736F6E));
var directionalLight=new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position=camera.position;
camera.add(directionalLight);

render();
animate();
light_update();

// render the scene
function render () {
    //refresh at 60FPS
    requestAnimationFrame( render );

    // rotate object
    //object.rotation.x += 0.01;

    // render the scene ultimately
    renderer.setClearColor (0xFCFCFC, 1);
    renderer.render(scene, camera);
};

// animate the controls
function animate() {
    requestAnimationFrame( animate );
    controls.update();
}

// update light
function light_update()
{
    directionalLight.position.copy( camera.position );
}