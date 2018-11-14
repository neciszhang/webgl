var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");

var program = gl.createProgram();
var vertexShader, fragmentShader;

var VSHADER_SOURCE, FSHADER_SOURCE;
VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n'+
    'void main(){\n' +
    'gl_Position = u_ModelMatrix*a_Position;\n' +
    '}\n';

FSHADER_SOURCE =
    'void main(){\n' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +
    '}\n';
var currentAngle=0,g_last=Date.now();

function createShader(gl, sourceCode, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader,sourceCode);
    gl.compileShader(shader);
    return shader;
}

//define vertexShader
vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER);
//define fragmentShader
fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER);
//attach shader to program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

//link program to shader
gl.linkProgram(program);
gl.useProgram(program);
gl.program = program;

//write the positions of vertices to a vertex shader
function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //get attribute a_Position address in vertex shader
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    //enalbe a_Positon variable
    gl.enableVertexAttribArray(a_Position);
    return n;
}

var n = initVertexBuffers(gl);
gl.clearColor(0, 0, 0, 1);

var u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');
var modelMatrix = new Matrix4();

function draw() {
    //clear canvas and background color
    gl.clear(gl.COLOR_BUFFER_BIT);
    modelMatrix.setRotate(currentAngle,0,1,0);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n);

}

function animate(){
    var now= Date.now();
    var duration=now-g_last;
    g_last=now;
    currentAngle=currentAngle+duration/1000*180;
}

var tick=function(){
    animate();
    draw();
    requestAnimationFrame(tick);
}

tick();