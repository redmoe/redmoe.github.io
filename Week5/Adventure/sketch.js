var sceneData;

var currentScene = 0;
var scenes = [];
var img;
var fennel = 0;
function preload() {
  sceneData = loadJSON('scenes.json');
  img = loadImage('assets/fennel.png');
}

function setup() {
  createCanvas(800, 800);
  CreateScenesFromData(sceneData.scenes);
}

function draw() {
  background(127,0,0);
  scenes[currentScene].display();

   fill(255);;
  textSize(16);
  textAlign(CENTER);
  text("Press the corresponding number key to pick an option", width/2, 750);
  text("Total fennel found: " + fennel,width/2,700)
  for (var i = 0; i < fennel; i++) {
      image(img, i * 100, 390);
  }
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].nextScenes, data[i].optionName,data[i].hasFennel));
  }
}

function Scene(sceneText, nextScenes, optionName, hasFennel) {
  this.sceneText = sceneText;
  this.nextScenes = nextScenes;
  this.optionName = optionName;
  this.hasFennel = hasFennel;
  this.display = function() {
    fill(255);
    textSize(16);
    var fennelText = "";
    if (hasFennel == true) {
      fennelText = " You swoop up one of the errant fennels!"
    }
    text(this.sceneText + fennelText, 100, 100,600,200);
    textAlign(LEFT);
    for (var i = 0; i < nextScenes.length; i++) {//this.optionName[i]
      text((i + 1) + '. ' + scenes[this.nextScenes[i]].optionName, 150, 200 + i * 50);
    }
  }
}

function keyPressed() {
  if (fennel >= 5) {
      currentScene = 5;
  }
  else {
    var numberPressed = parseInt(key);
    var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
    if (newScene !== undefined) {
      currentScene = newScene;
      if (scenes[currentScene].hasFennel == true) {
        fennel++;
        scenes[currentScene].hasFennel = false;
      }
    }
  }

}
