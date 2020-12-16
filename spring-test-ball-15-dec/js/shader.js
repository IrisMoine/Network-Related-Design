// in this example we will send a value from our p5 sketch to the shader
// these values are called "uniform" variables
// we will use p5's setUniform function to make this happen
// https://p5js.org/reference/#/p5.Shader/setUniform

// a shader variable
let theShader;
let cam;

function preload(){
  // load the shader
  theShader = loadShader('shaders/webcam.vert', 'shaders/webcam.frag');
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  
  cam.hide();
}

function draw() {
  // shader() sets the active shader with our shader
  shader(theShader);
  
  // passing cam as a texture
  theShader.setUniform('tex0', cam);

  // rect gives us some geometry on the screen
  rect(0,0,width,height);
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
