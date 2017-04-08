// init scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// init renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// create first object cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// create second object cube2
var geometry2 = new THREE.BoxGeometry( 2, 1, 1 );
var material2 = new THREE.MeshBasicMaterial( { color: 0x001100 } );
var cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );

// move camera away from the object to make it visable
camera.position.z = 5;

// render the scene
var render = function () {
    //refresh at 60FPS
    requestAnimationFrame( render );

    // rotate cube fast-ish
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    //rotate cube2 slow
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    // render the scene ultimately
    renderer.render(scene, camera);
};

render();
