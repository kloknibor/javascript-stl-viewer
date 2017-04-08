/**
 * Created by Robin on 04/08/17.
 */
// init scene
var scene = new THREE.Scene();

//camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 10);
camera.lookAt(new THREE.Vector3(0,0,0));

// camera controls
var controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
controls.addEventListener( 'change', render );

animate();

// lights
scene.add(new THREE.AmbientLight(0x736F6E));

// init renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// import stl into three.js

// create loader
var loader = new THREE.STLLoader();

// create object
var object = new THREE.Object3D()
 loader.load( '../slotted_disk.stl', function ( geometry ) {
     var material=new THREE.MeshLambertMaterial({ ambient: 0xFBB917,color: 0xfdd017 });
     object = new THREE.Mesh(geometry, material);
     scene.add(object);
      });

// lights
var directionalLight=new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position=camera.position;
scene.add(directionalLight);

// render the scene
var render = function () {
    //refresh at 60FPS
    requestAnimationFrame( render );

    // rotate object
    object.rotation.x += 0.1;

    // render the scene ultimately
    renderer.render(scene, camera);
};

render();

function animate() {
    requestAnimationFrame( animate );
    controls.update();
}
