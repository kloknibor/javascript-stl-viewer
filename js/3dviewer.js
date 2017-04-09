/**
 * Created by Robin on 04/08/17.
 */
// main loop
// init vars
    var line,BoundingBox,ColourBoundingBox,directionalLight,renderer,camera,scene,controls,windowWidth,windowHeight,controlWidth;
    var init = true;

// run init loop
    if(init){
        init_func();
        init = false;
    }

// listen for window resizing
window.onresize = function(){onWindowResize()};

render();
animate();

// init
function init_func (){
    // Printer bounding bx vars
    var printerX = 196.61;
    var printerY= 147.46;
    var printerZ = 220;

    // init vars
    controlWidth = 220;
    windowWidth = window.innerWidth - controlWidth;
    windowHeight = window.innerHeight;

    // init scene
    scene = new THREE.Scene();

    // camera
    // init camera
    camera = new THREE.PerspectiveCamera( 75, windowWidth/windowHeight, 0.1, 1000 );
    camera.position.set(0, 0, 300);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    // camera controls
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 20;
    controls.zoomSpeed = 3;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );

    // init renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( windowWidth, windowHeight );
    document.body.appendChild( renderer.domElement );

    // lights
    scene.add(new THREE.AmbientLight(0x736F6E));
    directionalLight=new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position=camera.position;
    camera.add(directionalLight);

    // create bounding box 3Dprinter
    ColourBoundingBox = new THREE.LineBasicMaterial({ color: 0x938A8A });
    BoundingBox = new THREE.Geometry();
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
    line = new THREE.Line(BoundingBox, ColourBoundingBox);
    scene.add(line);

    // upload stl
    window.addEventListener("load", function () {
        "use strict";
        // file load
        var openFile = function (file) {
            var reader = new FileReader();
            reader.addEventListener("load", function (ev) {
                var buffer = ev.target.result;
                import_stl(buffer);
            }, false);
            reader.readAsArrayBuffer(file);
        };

        // file input button
        var input = document.getElementById("file");
        input.addEventListener("change", function (ev) {
            var file = ev.target.files[0];
            openFile(file);
        }, false);

        // dnd
        window.addEventListener("dragover", function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "copy";
        }, false);
        window.addEventListener("drop", function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            var file = ev.dataTransfer.files[0];
            openFile(file);
        }, false);
    }, false);


}

// add part to canvas
function import_stl (file_location) {

    // create loader
    var loader = new THREE.STLLoader();

// import stl into three.js
// create object
    var object = new THREE.Object3D()
    loader.load( file_location, function ( geometry ) {
        var material=new THREE.MeshLambertMaterial({ color: 0xfdd017 });
        object = new THREE.Mesh(geometry, material);
        scene.add(object);
    });

}

// render the scene
function render () {
    //refresh at 60FPS
    requestAnimationFrame( render );

    // rotate object
    //object.rotation.x += 0.01;

    // render the scene ultimately
    renderer.setClearColor (0xFCFCFC, 1);
    renderer.render(scene, camera);

}

// animate the controls
function animate() {
    requestAnimationFrame( animate );
    controls.update();
}

//run on window resize
function onWindowResize(){
    // just debugging
    console.log("We resized the window :-)");

    // calculate new window values
    windowWidth = window.innerWidth - controlWidth;
    windowHeight = window.innerHeight;

    // set new vars
    renderer.setSize(windowWidth, windowHeight);
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
}

