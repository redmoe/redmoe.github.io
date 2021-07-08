var boardSize = 10;
var blockSize = 50;
var arrayPos = [];
var currentlySelectedPoint=false;
var erasing;
function mouseClicked() {	
	if (currentlySelectedPoint==false) {
		drawNew();
	}
	else {
		currentlySelectedPoint=false;
	}	
	logToData ();
}
function drawNew () {
	var mouseGridPos = createVector(int(mouseX/blockSize), int(mouseY/blockSize) );
	var col = collisionDetection(mouseGridPos);
	if (arrayPos[col] == 1) {
		arrayPos[col] = 0;
		erasing = 1;
	}
	else {
		erasing = 0;
		arrayPos[col] = 1;
	}
}
function mouseRelease() {
	currentlySelectedPoint=false;
	logToData ();
}

function collisionDetection(newPos) {
	if (newPos.x >= 0 && newPos.x < boardSize && newPos.y >= 0 && newPos.y < boardSize) {
		var ind = (newPos.y*10 + newPos.x);
		return ind;
	}
}	
function setup() {
	createCanvas(boardSize*blockSize,boardSize*blockSize+blockSize);
	for(var i = 0; i < boardSize*boardSize; i++) {
    	arrayPos.push(0);
	}
}
function mouseDragged() {
	var mouseInd = int(mouseX/blockSize)*10+int(mouseY/blockSize);
			

	if (currentlySelectedPoint == false) {
			drawNew();
	}
	else if (currentlySelectedPoint !=  mouseInd) {
		var mouseGridPos = createVector(int(mouseX/blockSize), int(mouseY/blockSize) );
		var col = collisionDetection(mouseGridPos);
		if (arrayPos[col] == erasing) {
			if (arrayPos[col] == 1) {
				arrayPos[col] = 0;
			}
			else {
				arrayPos[col] = 1;
			}
		}
		
	}
	currentlySelectedPoint = mouseInd;

}
function draw () {
	noStroke();
	background(0);
	textSize(16);
	fill('#ffffff');

	rect(0,boardSize*blockSize,blockSize*boardSize,blockSize);
	fill(0);
	text("Left click/drag to draw\nDATA is in the console log",0,boardSize*blockSize+blockSize/2);
		
				fill('#ffffff');

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
