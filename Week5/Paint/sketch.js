var positions = [];
var brushSize = 10;
function setup() {
	createCanvas(512, 512);
}

function parseJson(data) {
	for (var i = 0; i < data.length; i++) {
		positions.push(new PaintMark(createVector(data[i].x, data[i].y), color(data[i].c,0,0), data[i].s));
	}
}
var hide = false;
function draw() {
  background(0);
  fill(255,0,0);
  if (hide == false) {
  	text("Tap D: Increase Brush Size\nTap A: Decrease Brush Size\nSpace: Save\nL: Load\nH: Hide this text",20,20);
  }
  for (var i = 0; i < positions.length; i++) {
  	positions[i].display();
  }
}

function PaintMark(pos, col, siz) {
	this.position = pos;
	this.color = col;
	this.size = siz;
	this.display = function() {
		noStroke();
		fill(this.color);
		ellipse(this.position.x, this.position.y, siz, siz);
	}
}

function keyPressed() {
	if (key === ' ') {
		savePaint();
	}
	if (key === 'L') {
		loadJSON('paint.json', parseJson);
	}
	if (key === 'D') {
		brushSize++;
	}
	if (key==='A') {
		brushSize--;
	}
	if (key==='H') {
		hide = !hide;
	}	
}

function mouseDragged() {
	positions.push(new PaintMark(createVector(mouseX, mouseY), color(random(0,255),0,0),brushSize));
}

function savePaint() {
	paintMarkPositions = [];
	for (var i = 0; i < positions.length; i++) {
		paintMarkPositions.push(
		{
			x: positions[i].position.x,
			y: positions[i].position.y,
			c: red(positions[i].color),
			s: positions[i].size
		}
		);
	}
	saveJSON(paintMarkPositions, 'paint.json');
}