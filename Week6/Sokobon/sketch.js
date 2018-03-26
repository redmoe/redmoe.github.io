	var blockSize;
	var boardSize = 10;
	var blockArray = [];
	var colors = [];
	var levelIndex = 0;
	var levels;
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
	var visuals = [];
	function setup() {
		loadJSON('block.json', parseJson);
		blockImages.push(loadImage("assets/block.png")); //0
		blockImages.push(loadImage("assets/box.png")); //1
		blockImages.push(loadImage("assets/barrel.png")); //2
		blockImages.push(loadImage("assets/brick.png")); //3
		blockImages.push(loadImage("assets/boxPlayer.png")); //4 
		blockImages.push(loadImage("assets/barrelPlayer.png")); //5
		blockImages.push(loadImage("assets/skull.png")); //6
		myFont = loadFont('assets/3by3.ttf');
		createCanvas(640,640);
		colors = [color ('#fff1e8'),color ('#29adff'),color('#ff004d'),color('#5f574f'),color('#000000')];
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
		textSize(blockSize/2);
		textAlign(CENTER, CENTER);
		noSmooth();
		var millisecond = millis();
		imageMode(CORNER);
		for (var y = 0; y < 2; y++) {
 			for(var x = 0; x < boardSize; x++) {
                image(blockImages[3],x*blockSize,y*(height-blockSize),blockSize,blockSize);
            }
		}
		if (timer < millisecond) {
			falseTrue = !falseTrue;
			timer += 128;
		}
		bounceSize = 4 * Math.sin(pulseSize ) + blockSize;
 		pulseSize+=0.1;
 		imageMode(CENTER);
		for (var i = 0; i < visuals.length; i++) {
			visuals[i].Display();
		}		
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
		var currentText = levelName;
		var bottomText = levelName;
		switch (whichScene) {
			case sceneState.Player1Turn:
				newColor = colors[1];
				currentText = "BOXY'S TURN";
				if (levelIndex == 2) {
					bottomText = "WASD TO MOVE"
				}
		    break;	
			case sceneState.Player2Turn:
				newColor = colors[2];
				currentText = "BARRELY'S TURN";
				if (levelIndex == 2) {
					bottomText = "ARROW KEYS TO MOVE"
				}
		    break;
			case sceneState.PlayerWin:
				if (currentWinner) {
					newColor = colors[1];
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
				NextLevel();
		    break;	
		    case sceneState.PaintMode:
		        currentText = "LEVEL EDITOR MODE";
		    break;	    	    	    
		}
		currentColor =  lerpColor(currentColor,newColor,.5);
		if (levelIndex == 1) {
			fill(currentColor);
			rect(blockSize*2.5,blockSize*3.5,blockSize*5,blockSize*3);
			fill(colors[0]);
			textAlign(CENTER,CENTER);
			text("BOXES\nVS\nBARRELS:\nCRATEGEDDON",width/2,height/2);
		  	bottomText = "PRESS SPACE TO START";
		}
		else if (levelIndex == 2) {
	
		}
		fill(currentColor);
		rect(blockSize/4,blockSize/4,width-blockSize/2,blockSize/2);
		rect(blockSize/4,height-blockSize+blockSize/4,width-blockSize/2,blockSize/2);
		fill(colors[0]);
		text(currentText, width/2,blockSize/2);	
		text(bottomText, width/2,height-blockSize/2);
		textAlign(LEFT);
		text(kings[0].score,blockSize/2,blockSize/2);
		textAlign(RIGHT);
		text(kings[1].score,width-blockSize/2,blockSize/2);
	}
	function King (index,faction) {
		//this.blockIndex = index;
		this.block = blockArray[index];
		this.faction = faction;
		this.score = 0;
		this.FindKing = function () {
			if (this.block != null) {
				if (this.block.image === blockImages[faction+3] && this.block.faction === this.faction) {
					console.log(this.block.position+"stil decenet");
					return;
				}
			}
			for (var i = 0; i < blockArray.length; i++) {
				if (blockArray[i].faction === this.faction) {
					console.log(this.faction+"for try");
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
	function Skull (position,col) {
		this.position = position;
		this.curCole = col;
		this.alph = 255;
		this.blink = 16;

		this.Display = function () {
	    	if (this.blink > 0) {
	    		this.blink--;
	    	}
	    	else {
	    		this.alph = lerp(this.alph,0,.1);
	    	}
	    	if (falseTrue) {
			    tint(255,this.alph);
	    	}
	    	else {
				tint(this.curCole.levels[0],this.curCole.levels[1],this.curCole.levels[2],this.alph);
	    	}
	    	image(blockImages[6],this.position.x+(blockSize/2),this.position.y+(blockSize/2),blockSize*(this.alph/255),blockSize*(this.alph/255));
		    if (this.alph  == 0)  {
				for (var f = 0; f < visuals.length; f++) {
					if (visuals[f] == this) {
						visuals.splice(f,1)
					}
				}
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
			if (currentState == this.faction && (this.image == blockImages[4] || this.image == blockImages[5])) {
			   imgSize = bounceSize;
			}
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
						if (otherBlock.image == blockImages[4] || otherBlock.image == blockImages[5]) {
							visuals.push(new Skull(otherBlock.position,colors[otherBlock.faction]));
							blockArray.splice(colCheck[0],1);
							kings[otherBlock.faction-1].block = null;
						}
						else if (otherBlock.faction != 0) {
							otherBlock.UpdateFaction(0);
							otherBlock.imgBlink = [this.faction,16];
						}
						else {
							otherBlock.UpdateFaction(this.faction);
						}
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
 			if (colCheck[0].image == blockImages[4] || colCheck[0].image == blockImages[5]) {
 				kings[colCheck[0].faction-1].block = null;
 			}			 			
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