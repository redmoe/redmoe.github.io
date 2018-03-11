var blockSize;
var boardSize = 10;
var player;
var blockArray = [];

function setup() {
	createCanvas(600,600);
	blockSize = height/boardSize;
	player = new Player(createVector(5*blockSize,3*blockSize));
	for (var i = 0; i < boardSize; i++) {
		for (var f = 0; f < 2; f++) {
			blockArray.push(new Block(createVector(i*blockSize,f*blockSize)));
		}
	}
}

function draw() {
	background(0);
	for (var i = 0; i < blockArray.length; i++) {
		blockArray[i].Display();
	}
	player.Display();
	print("HEY!!!")
}
function Block (position) {
	this.position = position;

	this.Display = function () {
		fill(255);
		rect(this.position.x,this.position.y,blockSize,blockSize);
	}
}
function Player (position) {
	this.position = position;

	this.Display= function() {
		fill(255,0,0);
		rect(this.position.x,this.position.y,blockSize,50);
		rect(this.position.x,this.position.y,blockSize,blockSize);
	}
	this.Move = function (newMove) {
		var newPos = newMove + this.position;
		var posCheck = true;
		for (var i = 0; i < blockArray.length; i++) {
			if (blockArray[i].position.x == newPos.x) {
				posCheck = false;
				break;
			}
		}
		if (posCheck) {
			this.position.x += newMove.x;
			this.position.y += newMove.y;			
		}
	}
}
function keyPressed () {
	if (key == 'D') {
		player.Move(createVector(blockSize,0));
	}
	if (key == 'A') {
		player.Move(createVector(-blockSize,0));
	}
	if (key == 'W') {
		player.Move(createVector(0,-blockSize));
	}	
	if (key == 'S') {
		player.Move(createVector(0,blockSize));
	}	
}