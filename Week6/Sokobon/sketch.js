	var blockSize;
	var boardSize = 10;
	var redPlayer;
	var bluePlayer;	
	var blockArray = [];
	// function preload() {
	// 	loadJSON('block.json', parseJson);
	// }
	var red;
	var blue;
	var white;
	var borders;
	function setup() {
		createCanvas(600,600);
		red = color(255,0,0);
		blue = color (0,0,255);
		white = color (255);
		blockSize = height/boardSize;
		borders = blockSize;
		redPlayer = new Block(createVector(6*blockSize,6*blockSize),red,3);
		bluePlayer = new Block(createVector(3*blockSize,3*blockSize),blue,3);
		blockArray.push(new Block(createVector(-blockSize, -blockSize),white,1));
		//blockArray.push(new Block(createVector(4, 4),color(255),1));

		blockArray.push(redPlayer);
		blockArray.push(bluePlayer);

		// for (var i = 0; i < boardSize; i++) {
		// 	for (var f = 0; f < 2; f++) {
		// 		blockArray.push(new Block(createVector(i*blockSize,f*blockSize)));
		// 	}
		// }
	}
	function parseJson(datar) {
		data = datar[1];
		for (var i = 0; i < data.length; i++) {
			blockArray.push(new Block(createVector(data[i].x*blockSize, data[i].y*blockSize),color(255),1));
			print(i);
		}
	}
	function draw() {
		background(255);
		fill(0)
		rect(blockSize,blockSize,width-(blockSize*2),height-(blockSize*2));
		// var currentTime = millis();
		// print("CT: " + currentTime + " TI:" + timer);
	// var timer = 0;
	// var moveDelay = 200;
		// if (currentTime > timer)  {
		// 	if (key == 'D') {
		// 		redPlayer.Move(createVector(blockSize,0));
		// 		timer = currentTime + moveDelay;
		// 	}
		// 	if (key == 'A') {
		// 		redPlayer.Move(createVector(-blockSize,0));
		// 		timer = currentTime + moveDelay;
		// 	}
		// 	if (key == 'W') {
		// 		redPlayer.Move(createVector(0,-blockSize));
		// 		timer = currentTime + moveDelay;
		// 	}	
		// 	if (key == 'S') {
		// 		redPlayer.Move(createVector(0,blockSize));
		// 		timer = currentTime + moveDelay;
		// 	}
		
		// }
		noStroke();
		for (var i = 0; i < blockArray.length; i++) {
			blockArray[i].Display();
		}	
		textAlign(CENTER);
		textSize(blockSize/2);
		var currentPlayerText = "";
		if (playerTurn) {
			fill(blue);
			var currentPlayerText = "Blue";
		}
		else {
			fill(red);
			var currentPlayerText = "Red";
		}
		text(currentPlayerText+"'s Turn!", width/2,50);
		// textAlign(LEFT);
		// fill(redPlayer.color);
		// text(redPlayer.health, 0,50);
		// textAlign(RIGHT);
		// fill(bluePlayer.color);
		// text(bluePlayer.health, width,50);		
	}
	function Block (position,color,health) {
		this.position = position;
		this.color = color;
		this.health = health;
		this.index = 0;

		this.Display = function () {
			fill(this.color);
			rect(this.position.x,this.position.y,blockSize,blockSize);
			fill(0);
			textAlign(CENTER);
			text(this.index,this.position.x+(blockSize/2),this.position.y+(blockSize/2));
		}
		this.Move = function (newMove) {
			var newPos = (createVector(newMove.x + this.position.x,newMove.y + this.position.y));
			var colCheck = collisionDetection(newPos);
			if (colCheck === true) {
				this.position.x += newMove.x;
				this.position.y += newMove.y;	
				playerTurn = !playerTurn;		
				return true;
			}
			else if (colCheck != false) {
				if (this.color != blockArray[colCheck].color) {
					blockArray[colCheck].health = this.health;
					if (blockArray[colCheck].color != white) {
						blockArray[colCheck].color = white;
					}
					else {
						blockArray[colCheck].color = this.color;
					}
				}
				else {
					var SecondColCheck = blockArray[colCheck].Move(newMove);
					if (SecondColCheck === true) {
						this.position.x += newMove.x;
						this.position.y += newMove.y;
						return true;
					}
				}
			}
			else {
				this.color = white;
			}
			return false;
		}		
	}
	var playerTurn = false;
	function moveBlocks (color, moveDir) {
		for (var i = 0; i < blockArray.length; i++) {
			blockArray[i].index = i;
			if (blockArray[i].color == color) {
				blockArray[i].Move(moveDir);
			}
		}
	}
	function keyPressed () {
		//if (!playerTurn) {
			if (key == 'W') {
				moveBlocks(red,createVector(0,-blockSize));
				//redPlayer.Move(createVector(0,-blockSize));
			}	
			else if (key == 'A') {
				moveBlocks(red,createVector(-blockSize,0));
				//redPlayer.Move(createVector(-blockSize,0));
			}
			else if (key == 'S') {
				moveBlocks(red,createVector(0,blockSize));

				//redPlayer.Move(createVector(0,blockSize));
			}
			else if (key == 'D') {
				moveBlocks(red,createVector(blockSize,0));		
				//redPlayer.Move(createVector(blockSize,0));
			}
		//}
		//else {
			if (key == 'U') {
				moveBlocks(red,createVector(0,-blockSize));
			}				
			else if (key == 'H') {
				moveBlocks(blue,createVector(-blockSize,0));
			}
			else if (key == 'J') {
				moveBlocks(blue,createVector(0,blockSize));
			}	
			else if (key == 'K') {
				moveBlocks(blue,createVector(blockSize,0));		
			}					
		//}
		if (key === 'L') {
			console.log("LOADING JSON");
			loadJSON('block.json', parseJson);
		}
		if (key === 'O') {
			saveBlocks('block.json', parseJson);
		}
	}
	function saveBlocks() {
		blockPositions = [];
		for (var i = 0; i < blockArray.length; i++) {
			blockPositions.push(
				{
					x: blockArray[i].position.x/blockSize,
					y: blockArray[i].position.y/blockSize,
				}
			);
		}
		saveJSON(blockPositions, 'block.json');
	}	

	function mouseClicked() {
		mouseGridPos = createVector(int(mouseX/blockSize)*blockSize, int(mouseY/blockSize) * blockSize)
		var colCheck = collisionDetection(mouseGridPos);
		if (colCheck === true) {
			blockArray.push(new Block(mouseGridPos,color(255),1));
		}
		else if (colCheck != false){
			blockArray.splice(colCheck,1);
		}
	}	

	function collisionDetection(newPos) {
		if (newPos.x < blockSize || newPos.x >= width -blockSize || newPos.y < blockSize || newPos.y >= height -blockSize){
			return false;
		}
		else {
			for (var i = 0; i < blockArray.length; i++) {
				if (blockArray[i].position.x == newPos.x && blockArray[i].position.y == newPos.y) {
					return i;
				}
			}
		}	
		return true;
	}

				//var posCheck = true;

			// if (newPos.x < 0 || newPos.x >= width || newPos.y < 0 || newPos.y >= height ){
			// 	posCheck = false;
			// }
			// else {
			// 	for (var i = 0; i < blockArray.length; i++) {
			// 		if (blockArray[i].position.x == newPos.x && blockArray[i].position.y == newPos.y) {
			// 			posCheck = false;
			// 			break;
			// 		}
			// 	}
			// }
			// var fir = [[1,2],[3,7]]
			// fir[1] = [3,7];
			// sec = fir[1];
			// sec[0] = 3;