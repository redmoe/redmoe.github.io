	var blockSize;
	var boardSize = 10;
	var blockArray = [];
	var colors = [];
	var levelIndex = 0;
	var levels;
	var peasentImg;
	var knightImg;
	var currentWinner = false;
	var sceneState = {
		  TitleScreen: 0,
		  Player1Turn: 1,
		  Player2Turn: 2,
		  PlayerWin: 3,		  
		  LoadingLevel: 4,
		  PaintMode: 5,
	};
	var currentState = sceneState.Player1Turn;
	var loadingComplete = false;
	var kings = [];
	var timer = 0;
	var blockImages = [];
	var pulseSize = 0;
	var bounceSize = 0;
	var falseTrue = false;
	var levelName = "";
	var currentBlock = 0;
	var myFont;
	var currentColor;
	var newColor;

	function setup() {
		loadJSON('block.json', parseJson);
		blockImages.push(loadImage("assets/block.png")); //0
		blockImages.push(loadImage("assets/box.png")); //1
		blockImages.push(loadImage("assets/barrel.png")); //2
		blockImages.push(loadImage("assets/brick.png")); //3
		blockImages.push(loadImage("assets/boxPlayer.png")); //4 
		blockImages.push(loadImage("assets/barrelPlayer.png")); //5
		myFont = loadFont('assets/font.ttf');
		createCanvas(640,640);
		colors = [color ('#fff1e8'),color ('#29adff'),color('#ff004d'),color('#5f574f')];
		blockSize = height/boardSize;
		blockArray.push(new Block(createVector(3*blockSize,3*blockSize),1,4));
		blockArray.push(new Block(createVector(6*blockSize,6*blockSize),2,5));
		kings.push(new King(0,1));
		kings.push(new King(1,2));
		blockArray.push(kings[0].block);
		blockArray.push(kings[1].block);
		kings[0].FindKing();
		kings[1].FindKing();
		currentColor = colors[0];
		newColor = colors[0];
		NextLevel ();
	}

	function draw() {
		noStroke();
		background('#ffccaa');
		textFont(myFont);
		tint(255,255);
		var millisecond = millis();
		imageMode(CORNER);
		for (var y = 0; y < 2; y++) {
 			for(var x = 0; x < boardSize; x++) {
                image(blockImages[3],x*blockSize,y*(height-blockSize),blockSize,blockSize);
            }
		}
		if (timer < millisecond) {
			falseTrue = !falseTrue;
			timer += 100;

		}
		bounceSize = 4 * Math.sin(pulseSize ) + blockSize;
 		pulseSize+=0.1;
		for (var i = 0; i < blockArray.length; i++) {
			blockArray[i].Display();
		}	
		CheckScene (currentState);
	}
	function ChangeScene (whichScene) {
		currentState = whichScene;
		switch (whichScene) {
			case sceneState.Player1Turn:
				kings[0].FindKing();
				kings[1].FindKing();
			break;
			case sceneState.Player2Turn:
				kings[0].FindKing();
				kings[1].FindKing();
			break;			
			case sceneState.PlayerWin:
				if (currentWinner) {
					kings[0].score++;
				}
				else {
					kings[1].score++;
				}
		    break;		
		}

	}
	function CheckScene (whichScene) {
		textAlign(CENTER, CENTER);
		textSize(blockSize/2);
		var currentText = levelName;
		var bottomText = levelName;
		switch (whichScene) {
			case sceneState.Player1Turn:
				newColor = colors[1];
				currentText = "BOXY'S TURN!";
		    break;	
			case sceneState.Player2Turn:
				newColor = colors[2];
				currentText = "BARLEY'S TURN!";
		    break;
			case sceneState.PlayerWin:
				if (currentWinner) {
					newColor = colors[2];
					currentText = "BOXES WINS";
				}
				else {
					newColor = colors[2];
					currentText = "BARRELS WINS";
				}
				bottomText = "PRESS SPACE TO CONTINUE";
		    break;			    
			case sceneState.LoadingLevel:
				currentText = "LOADING LEVEL";
				var millisecond = millis();
				NextLevel();
		    break;	
		    case sceneState.PaintMode:
		        currentText = "LEVEL EDITOR MODE";
		    break;	    	    	    
		}
		currentColor =  lerpColor(currentColor,newColor,.5);
		if (levelIndex == 1) {
				fill(currentColor);
				rect(blockSize*3,blockSize*4,blockSize*4,blockSize*2);
				fill(colors[0]);
				text("CRATES\nVS.\nBARRELS",blockSize*3,blockSize*3.4,blockSize*4,blockSize*2);
		  		bottomText = "PRESS SPACE TO START";
		}
		fill(currentColor);
		rect(blockSize/4,blockSize/4,width-blockSize/2,blockSize/2);
		rect(blockSize/4,height-blockSize+blockSize/4,width-blockSize/2,blockSize/2);
		fill(colors[0]);
		text(currentText, width/2,blockSize/2);	
		text(bottomText, width/2,height-blockSize/2);
		textAlign(LEFT,CENTER);
		text(kings[0].score,blockSize/2,blockSize/2);
		textAlign(RIGHT);
		text(kings[1].score,width-blockSize/2,blockSize/2);
	}

	function Level (blocks) {
		this.blocks = blocks;
	}
	function King (index,faction) {
		this.blockIndex = index;
		this.block = blockArray[index];
		this.faction = faction;
		this.score = 0;
		this.FindKing = function () {
			this.block = blockArray[this.blockIndex];
			if (this.block != null) {
				if (this.block.image === blockImages[faction+3] && this.block.faction === this.faction) {
					return;
				}
			}
			for (var i = 0; i < blockArray.length; i++) {
				if (blockArray[i].faction === this.faction) {
						this.blockIndex = i;
						this.block = blockArray[i];
						blockArray[i].image = blockImages[faction+3];
						return;
					}
				}
			if (currentState == sceneState.Player1Turn || currentState == sceneState.Player2Turn) {
				if (faction == 1) {
				    currentWinner = false;
				}
				else {
					currentWinner = true;
				}
				ChangeScene (sceneState.PlayerWin);
			}
		}
	}
	function Block (position,faction,img) {
		this.position = position;
		this.faction = faction;
		this.color = colors[faction];
		this.image = blockImages[img];
		this.imgBlink = [0,0];

		this.Display = function () {
			var imgSize = blockSize;
			var curCol = 255;
			if (this.imgBlink[1] !== 0 && falseTrue === true) {
				curCol = colors[this.imgBlink[0]];
				this.imgBlink[1]--;
			}
			tint(curCol,255);
			noSmooth();
			if (currentState == this.faction && (this.image == blockImages[4] || this.image == blockImages[5])) {
			   imgSize = bounceSize;
			}
			imageMode(CENTER);
 			image(this.image,this.position.x+(blockSize/2),this.position.y+(blockSize/2),imgSize,imgSize);
		}
		this.UpdateFaction = function (newFac) {
			var oldFac = this.faction;
			if (newFac < colors.length) {
				this.faction = newFac;
				this.color = colors[newFac];
			}
			else {
				this.faction = 0;
				this.color = colors[0];
			}
			this.image = blockImages[newFac];	
			if (this.image == blockImages[4] || this.image == blockImages[5]) {
				findLeaders (oldFac);
			}
		}
		this.Move = function (newMove) {
			var newPos = (createVector(newMove.x + this.position.x,newMove.y + this.position.y));
			var colCheck = collisionDetection(newPos);
			if (colCheck[0] === true) {//Nothing in the way
				this.position = colCheck[1];
				if (this.image == blockImages[4] || this.image == blockImages[5]) {
					if (this.faction == 1) {
						ChangeScene(sceneState.Player2Turn);
					}
					else {
						ChangeScene(sceneState.Player1Turn);
					}	
				}	
				return true;
			}
			else if (colCheck[0] !== false) {//Get the object that's being collided withif (colCheck !== false)
				var otherBlock = blockArray[colCheck[0]];
				if (otherBlock.image != blockImages[3]) {
					if (this.color != otherBlock.color) {
						if (otherBlock.faction != 0) {
							otherBlock.UpdateFaction(0);
							otherBlock.imgBlink = [this.faction,16];
						}
						else {
							otherBlock.UpdateFaction(this.faction);
						}
						kings[0].FindKing();
				     	kings[1].FindKing();
				     	if (this.faction == 1) {
						    ChangeScene(sceneState.Player2Turn);
						}
						else {
							ChangeScene(sceneState.Player1Turn);
						}	
					}
					else {
						var SecondColCheck = otherBlock.Move(newMove);
						if (SecondColCheck == true) {
							this.position = colCheck[1];
							return true;
						}
					}
				}
			}
			return false;
		}		
	}

	function keyPressed () {
		switch (currentState) {
		 	case sceneState.Player1Turn:
				if (key == 'W') {
					kings[0].block.Move(createVector(0,-blockSize));
				}	
				else if (key == 'A') {
					kings[0].block.Move(createVector(-blockSize,0));
				}
				else if (key == 'S') {
					kings[0].block.Move(createVector(0,blockSize));
				}
				else if (key == 'D') {
					kings[0].block.Move(createVector(blockSize,0));		
				}	
			break;
			case sceneState.PlayerWin:
				if (key === ' ') {
					NextLevel();
				}
		 	break;		 		 	
		 	case sceneState.Player2Turn:
				if (keyCode === UP_ARROW) {
					kings[1].block.Move(createVector(0,-blockSize));
				}				
				else if (keyCode === LEFT_ARROW) {
					kings[1].block.Move(createVector(-blockSize,0));
				}
				else if (keyCode === DOWN_ARROW) {
					kings[1].block.Move(createVector(0,blockSize));
				}	
				else if (keyCode === RIGHT_ARROW) {
					kings[1].block.Move(createVector(blockSize,0));		
				}
		 	break;			 				 	
		}
		if (currentState == sceneState.PaintMode) {
			if (key === 'L') {
				loadJSON('block.json', parseJson);
				ChangeScene(sceneState.LoadingLevel);
				NextLevel();
			}
			if (key === 'O') {
				saveBlocks('block.json', parseJson);
			}
			switch (keyCode) {
				case 49:
					currentBlock = 0;
				break;
				case 50:
					currentBlock = 1;				
				break;
				case 51:
					currentBlock = 2;				
				break;
				case 52:
					currentBlock = 3;				
				break;
				case 53:
					NextLevel();				
				break;
				case 192:
					ChangeScene(sceneState.Player1Turn);
				break;
			}
		}
		else if (keyCode === 192) {
			ChangeScene(sceneState.PaintMode);
		}
		if (levelIndex == 1) {
			if (key === ' ') {
				NextLevel();
			}
		}
	}
	function createBlock (newType) {
		var mouseGridPos = createVector(int(mouseX/blockSize)*blockSize, int(mouseY/blockSize) * blockSize);
		var colCheck = collisionDetection(mouseGridPos);
		var newBlock;
		if (colCheck[0] === true) {
			newBlock = new Block(mouseGridPos,0);
			blockArray.push(newBlock);
			newBlock.UpdateFaction(newType);
		}
		else if (colCheck[0] !== false){
 			blockArray.splice(colCheck[0],1);
		}
		kings[0].FindKing();
		kings[1].FindKing();
	}
	function mouseClicked() {
		if (currentState == sceneState.PaintMode) {
			createBlock (currentBlock);
	    }
	}
	function collisionDetection(newPos) {
		var reversePos = false;
		var fullSum = [true, newPos];
		if (newPos.x < 0) {
			reversePos = createVector((boardSize*blockSize)-blockSize,newPos.y);
		}
		else if ( newPos.x >= width) {
			reversePos = createVector(0,newPos.y);
		}
		else if (newPos.y >= height - blockSize || newPos.y < blockSize) {
			fullSum[0] = false;
		}
		else {		
			for (var i = 0; i < blockArray.length; i++) {
				if (blockArray[i].position.x == newPos.x && blockArray[i].position.y == newPos.y) {
					fullSum[0] = i;
				}
			}
		}	
		if (reversePos !== false) {

			fullSum = collisionDetection(reversePos);
		}
		return fullSum;
	}	
	function parseJson(datar) {	
		levels = datar;
		loadingComplete = true;
		console.log("PARSING COMPLETE");
	}
	function NextLevel () {
		if (loadingComplete) {			
			data = levels[levelIndex];
			blockArray = [];
			levelName = data[0];
			for (var i = 1; i < data.length; i++) {
				blockArray.push(new Block(createVector(data[i].x*blockSize, data[i].y*blockSize),data[i].f,data[i].i));
			 }
			kings[0].block = blockArray[0];
			kings[1].block = blockArray[0];
			kings[0].FindKing();
			kings[1].FindKing();
				ChangeScene(sceneState.Player1Turn);
			levelIndex++;
			if (levelIndex > levels.length-1) {
			 	levelIndex = 0;
			}	
		}
		else {			
			ChangeScene(sceneState.LoadingLevel);
		}
	}	

	function saveBlocks() {
		blockPositions = [];
		for (var i = 0; i < blockArray.length; i++) {
			var imgInd = f;
			for (var f =0; f < blockImages.length; f++) {
				if (blockImages[f] == blockArray[i].image) {
					imgInd = f;
				}
			}
			blockPositions.push(
				{
					x: blockArray[i].position.x/blockSize,
					y: blockArray[i].position.y/blockSize,
					f: blockArray[i].faction,
					i: imgInd,
				}
			);
		}
		saveJSON(blockPositions, 'block.json');
	}
			//	fill(colors[1]);

		// if (timer < millisecond ) {
				// 	timer = millisecond + 1000;

				// 	currentText += ".";
				// }	//console.log(currentState);			// else {//Hit a wall
			// 	// kings[0].FindKing();
			// 	// kings[1].FindKing();
			// 	// this.image = blockImages[4];
			// 	// //this.UpdateFaction(0);
			// 	// this.imgBlink = 20;
			// 	// if (this.faction == 1) {
			// 	// 	ChangeScene(sceneState.Player2Turn);
			// 	// }
			// 	// else {
			// 	// 	ChangeScene(sceneState.Player1Turn);
			// 	// }	
			// }			//if (currentState != sceneState.TitleScreen) {
			// if (levelIndex == 0) {
			// 	ChangeScene(sceneState.TitleScreen);

			// }
			// else {
		//	}
			//}
			//console.log("Still Loading");
	// function findLeaders (faction) {
	// 	if (kings[faction-1].block.image === blockImages[3] && kings[faction-1].block.faction === faction) {
	// 		console.log("STAY THE SAME");
	// 		return;
	// 	}
	// 	else {
	// 					console.log("CHANGE IT UP");

	// 		for (var i = 0; i < blockArray.length; i++) {
	// 			if (blockArray[i].faction === faction) {
	// 			//	blockArray[i].index = 'K';
	// 				kings[faction-1].block = blockArray[i];
	// 				blockArray[i].image = blockImages[3];
	// 				return;
	// 			}
	// 		}
	// 	}
	// 							console.log("DONE FOR THE DAY");

	// 	if (currentState == sceneState.Player1Turn || currentState == sceneState.Player2Turn) {
	// 		if (faction == 1) {
	// 		currentWinner = false;
	// 		}
	// 		else {
	// 			currentWinner = true;
	// 		}
	// 		ChangeScene (sceneState.PlayerWin);
	// 	}
	// }

	// function AI (faction) {
	// 	var newPos = createVector(blockSize,0);
	// 	for (var i = -1; i < 2; i++) {
	// 		if (i == 0) {
	// 			for (var f = -1; f < 2; f += 2) {
	// 				var newVec = createVector(0,f*blockSize);
	// 				var testVec = p5.Vector.add(blockArray[kings[faction]].position,newVec);
	// 				var coCheck = collisionDetection(testVec);
	// 				if (coCheck === true) {
	// 					newPos = newVec;
	// 					break;
	// 				}
	// 			}
	// 		}
	// 		else {
	// 			var newVec = createVector(i*blockSize,0);
	// 			var testVec = p5.Vector.add(blockArray[kings[faction]].position,newVec);
	// 			var coCheck = collisionDetection(testVec);
	// 			if (coCheck === true) {
	// 				newPos = newVec;
	// 				break;
	// 			}
	// 		}
	// 	}
	// 	blockArray[kings[faction].Move(newPos);
	// }			// case sceneState.TitleScreen:
			// 	if (key === ' ') {
			// 		NextLevel();
			// 	}
		 // 	break;						// case 53:
				// 	newBlock = 4;
				// break;		// if (key === )
		// if (keyCode === 96)	// function mouseClicked() {
	// 	var mouseGridPos = createVector(int(mouseX/blockSize)*blockSize, int(mouseY/blockSize) * blockSize);
	// 	var colCheck = collisionDetection(mouseGridPos);
	// 	if (colCheck.x != null) {
	// 		blockArray.push(new Block(mouseGridPos,0));
	// 	}
	// 	else if (colCheck != false){
	// 		if (blockArray[colCheck].faction < colors.length-1) {
	// 			blockArray[colCheck].UpdateFaction(blockArray[colCheck].faction+ 1);
	// 		}
	// 		else {
 // 				blockArray.splice(colCheck,1);
	// 		}
	// 	}
	// 	kings[0].FindKing();
	// 	kings[1].FindKing();
	// }	
	// if (newPos.x < blockSize || newPos.x >= width -blockSize || newPos.y < blockSize || newPos.y >= height -blockSize){
	// 		var reversePos = (-newPos.x+1,newPos.y);
	// 		CcollisionDetection(reversePos)
	// 		return i;
	// }			//	console.log("NUMERO");
					//return i;			//console.log("REVESRE" + reversePos.x);		//return retryCol;

	// function collisionDetection(newPos) {
	// 	if (newPos.x < blockSize || newPos.x >= width -blockSize || newPos.y < blockSize || newPos.y >= height -blockSize){
	// 		return false;
	// 	}
	// 	else {				// else if (newPos.y < 0) {
		// 	var reversePos = createVector(newPos.x,boardSize*blockSize-blockSize);
		// } 
		// else if (newPos.y >= height) {
		// 	var reversePos = createVector(newPos.x,0);
		// }
	// 		for (var i = 0; i < blockArray.length; i++) {
	// 			if (blockArray[i].position.x == newPos.x && blockArray[i].position.y == newPos.y) {
	// 				return i;
	// 			}
	// 		}//(boardSize*blockSize)+(-(newPos.x/newPos.x)*(boardSize*blockSize))
	// 	}	
	// 	return true;
	// }					//console.log(colCheck.x);

				// this.position.x += newMove.x;		// for (var f = 0; f < datar.length; f++) {
		//     for (var i = 0; i < datar[f].length; i++) {
		//     	levels[f].push(newBlock(datar[f].x));
		//     }
		// }
			//console.log("Load Complete!")

				// this.position.y += newMove.y;	//var blockSize;//	var paintMode = false;
	// function preload () {
	// 	loadJSON('block.json', parseJson);
	// 	peasentImg = loadImage("assets/peasent.png"); 
	// 	knightImg = loadImage("assets/knight.png"); 
	// }		// colors[0] = color ('#fff1e8');
		// colors[1] = color ('#29adff');
		// colors[2] = color('#ff004d');
		// colors[3] = ('#5f574f')
		//blockSize = blockSize;
		//fill(0);		//fill(colors[0]);

		//rect(0,0,width,blockSize);
		//rect(0,height-blockSize,width,blockSize);

	//	console.log(falseTrue);

		//rect(blockSize,blockSize,width-(blockSize*2),height-(blockSize*2));

		//fill(colors[1]);

	//	fill(colors[2]);				console.log("blink");

			//	console.log("YESS")

			//console.log("Block" + position.x + " " + position.y);
			// else if (this.imgBlink == 1) {
			// 	for (var i = 0; i < blockArray.length; i++) {
			// 		if (blockArray[i].position = this.position) {
			// 			blockArray.splice(i,1);
			// 			console.log("SPLICED");
			// 		}
			// 	}
			// 	return;
			// }
			//rect(this.position.x,this.position.y,blockSize,blockSize);


			//fill(0);	
			//textAlign(CENTER);			//	currentText = "CRATES VS BARRELS: THE ULTIMATE SHOWDON OF GAMING HISTORY IN THE THUNDERDOME SMACKDOWN RAW 2018; OVERDRIVE GAIDEN;";
		  					//console.log("STAY THE SAME");

			//console.log("CHANGE IT UP");

			//console.log("DONE FOR THE DAY");
