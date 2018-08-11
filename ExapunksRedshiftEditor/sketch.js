var boardSize = 10;
var blockSize = 50;
var arrayPos = [];
function mouseClicked() {
	var mouseGridPos = createVector(int(mouseX/blockSize), int(mouseY/blockSize) );
	collisionDetection(mouseGridPos);
	logToData ();
}

function collisionDetection(newPos) {
	if (newPos.x >= 0 && newPos.x < boardSize && newPos.y >= 0 && newPos.y < boardSize) {
		var ind = (newPos.y*10 + newPos.x);
		if (arrayPos[ind] == 1) {
			arrayPos[ind] = 0;
		}
		else {
			arrayPos[ind] = 1;
		}
	}
}	
function setup() {
	createCanvas(boardSize*blockSize,boardSize*blockSize+blockSize);
	for(var i = 0; i < boardSize*boardSize; i++) {
    	arrayPos.push(0);
	}
}
function draw () {
	noStroke();
	background(0);
	fill('#ffffff');
	textSize(32);
	text("Left click to draw\nDATA is in the console log",0,boardSize*blockSize);
	for (var i = 0; i < arrayPos.length; i++) {
		if (arrayPos[i] == 1) {
			rect(Math.floor(i%10)*blockSize,Math.floor((i/10)%10)*blockSize,blockSize,blockSize);
		}
	}
}

function logToData () {
	var dataString = "";
	for (var x = 0; x < boardSize; x++) {
		dataString += "\nDATA";
		for (var y = 0; y < boardSize; y++) {
			dataString += " " + arrayPos[x*10+y];
		}
	}
	console.log(dataString);
}