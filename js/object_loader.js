// init scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 30);
camera.lookAt(new THREE.Vector3(0,0,0));

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

// define line
var material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });
var geo_line = new THREE.Geometry();
geo_line.vertices.push(new THREE.Vector3(-10, 0, 0));
geo_line.vertices.push(new THREE.Vector3(0, 10, 0));
geo_line.vertices.push(new THREE.Vector3(10, 0, 0));
geo_line.vertices.push(new THREE.Vector3(-10, 0, 0));
var line = new THREE.Line(geo_line, material_line);
scene.add(line);

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
