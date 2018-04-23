//var data = [];
var buttonElement;
//var selectedDay;
// var selectedMonth;
 var text;
var bg;
var jon;
var houseNames = [];
var SCENE_W = 1286;
var SCENE_H = 2880;
var loadr = false;
var img; 
function onButtonPressed() {
	loadJSON('https://anapioficeandfire.com/api/characters/' + int(random(1,1000)), newDay);
}
function setup () {
	//noCanvas();
	// createCanvas(600,600);
	// var doc = document.body;
	  img = loadImage("assets/Map_of_westeros.jpg");  // Load the image

	  createCanvas(800,400);
  bg = new Group();
 	jon = createSprite(400, 200, 50, 100);
	 //  for(var i=0; i<80; i++)
	 //  {
	 //  var rock = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
	 //  rock.addAnimation("normal", "assets/rocks"+i%3+".png");
	 //  bg.add(rock);
	 //  }
	 	  		   var rock = createSprite(0, 0);

	   //rock.addAnimation("normal", "assets/house"+0+".png");

	  // bg.add(rock);

    loadJSON('https://anapioficeandfire.com/api/houses?page=1&pageSize=50', newDay);
  //  houseNames[0] = "HEY";
    // buttonElement = createButton('for proper Game of Thrones spelling maybe');
    // buttonElement.mousePressed(onButtonPressed);
   // text = createElement('h1', "HEY");

}
function newDay (data) {
	//var t = document.createTextNode(data.name);
	//text.appendChild(t);
		// console.log(text.innerHTML);
		// console.log(text);

	//console.log(data[0].name);
	 //text.innerHTML = data.name;data.lengt
	  //createElement('h1', "I'm pretty sure their name is spelled " + text.innerHTML + ".");
	  for(var i=0; i<data.length; i++)
	  {
	  //	console.log(i);
	  		   var rock = createSprite(0, 0);

	   var rock = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
	   houseNames.push(data[i].name);
	   rock.addAnimation("normal", "assets/house"+i%5+".png");
	   bg.add(rock);
	  }
	      loadr = true;

	 //console.log(data[3].name);
	  //text = 

}
// https://anapioficeandfire.com/api/characters/453

function draw () {
	  //s  image(img, 0, height/2, img.width/2, img.height/2);

  background(139,69,19); 
  image(img, -SCENE_W/2, -SCENE_H/2,SCENE_W*2,SCENE_H*2);
 
// spr()
  jon.velocity.x = (camera.mouseX-jon.position.x)/20;
  jon.velocity.y = (camera.mouseY-jon.position.y)/20;
  
  if(mouseIsPressed)
    camera.zoom = .1;
  else
    camera.zoom = .3;
  
  camera.position.x = jon.position.x;
  camera.position.y = jon.position.y;
  
  if(jon.position.x < 0)
    jon.position.x = 0;
  if(jon.position.y < 0)
    jon.position.y = 0;
  if(jon.position.x > SCENE_W)
    jon.position.x = SCENE_W;
  if(jon.position.y > SCENE_H)
    jon.position.y = SCENE_H;
  drawSprites(bg);
  textSize(60);
 fill(255);
  textAlign(CENTER);
  if (loadr == true) {
  for(var i=0; i<houseNames.length; i++) {
  text(houseNames[i], bg[i].position.x,bg[i].position.y+300);
  //console.log(houseNames[i]);
  }
  noStroke();
    camera.off();
      textSize(20);
 fill(255);
  textAlign(CENTER);
  	rect(185,10,430,30);
  	fill(0)
    text("Totally accurate map of Westros. I think. Maybe.",width/2,30);
  }

  //console.log("fsdf");
}
// var req = new XMLHttpRequest();
// req.open('GET','https://dog.ceo/api/breeds/list/all');
// req.onload = function() {
// 	console.log(this.responseText);
// 	console.log(JSON.parse(this.responseText));
// }
// req.send();
