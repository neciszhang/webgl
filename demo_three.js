var canvas = document.getElementById("canvas");
var width = 400,
    height = 400;
var renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

var scene = new THREE.Scene();

var traniShape = new THREE.Shape();
traniShape.moveTo(0,200);
traniShape.lineTo(100,100);
traniShape.lineTo(300,100);
traniShape.lineTo(0,200);
var geomertry= new THREE.

var camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000);
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(400, 400);

renderer.render(scene, camera);