		var ball;
		var p1, p2;
		var p1Score = 0;
		var p2Score = 0;
		var p1Up = false;
		var p1Down = false;
		var p2Up = false;
		var p2Down = false;
		var margin = 20;
		var cnv;
		var paddleBounceSFX, hitColliderSFX;
		var colliders = [];
		var keyOn = false;
		var sceneState = {
		  TITLE: 0,
		  LEVEL1: 1,
		  LEVEL2: 2,
		  LEVEL3: 3,
		  END: 4,
		 // PlAYERWIN: 5
		};
		var currentState = sceneState.TITLE;

		function centerCanvas() {
		  var x = (windowWidth - width) / 2;
		  var y = (windowHeight - height) / 2;
		  cnv.position(x, y);
		}

		function windowResized() {
		  centerCanvas();
		}

		function setup() {
		 paddleBounceSFX = loadSound('assets/ballCollide.mp3', function() { console.log("loaded"); });
		 hitColliderSFX = loadSound('assets/hitCollider.mp3', function() { console.log("loaded"); });
		  cnv = createCanvas(900, 500);
		  centerCanvas();
		  ball = new Ball();
		  p1 = new Paddle(0);
		  p2 = new Paddle(1);
		}
		function checkTransition(whichScene) {
		  switch (whichScene) {
		    case sceneState.TITLE:
		      if (keyOn) {
		        currentState++;
		       //colliderNumber++;
		             colliders.push(new Munro ());

		       keyOn =false;
		      }
		      break;
		    case sceneState.LEVEL1:
		      if (p1Score !== p2Score) {
		        currentState++;
		       colliderNumber++;
		       colliderRefresh();
		      }
		      break;
		    case sceneState.LEVEL2:
		      if (p1Score < p2Score || p1Score > p2Score ) {
		        sceneState.END;
		      }
		      else if (p1Score == p2Score) {
		        currentState++;
		       colliderNumber++;
		       colliderRefresh();
		      }
		      break;
		    case sceneState.LEVEL3:
		      if (p1Score !== p2Score) {
		        currentState++;
		       colliderNumber++;
		       colliderRefresh();
		      }
		      break;   
		    case sceneState.END:
		      if (key === ' ') {
		        currentState=0;
		       colliderNumber=0;
		       colliderRefresh();
		       p1Score = 0;
		       p2Score = 0;
		      }
		      break;                
		    default:
		      break;
		  }
		}
		function drawScene(whichScene) {
		 // print(keyOn);
		 //print(currentState);
		  switch (currentState) {
		    case sceneState.TITLE:
		    //  background(100 + sin(frameCount * 0.05) * 50, 100 + sin(frameCount * 0.06) * 50, 100 + sin(frameCount * 0.07) * 50);
		     background(225,172,0);
		      fill(255);
		      textSize(64);
		      textAlign(CENTER, CENTER);
		      text("BEST OF 3\nIN THE COLLIDERDOME", width/2, height/2);    
		    break;
		    case sceneState.LEVEL1:
		      levelDraw();
		    break;
		    case sceneState.LEVEL2:
		          levelDraw();

		    break;
		    case sceneState.LEVEL3:
		              levelDraw();
		    break; 
		     case sceneState.END:
		      fill(255);
		      textSize(80);
		      textAlign(CENTER, CENTER);
		      var scoreString;
		      if (p1Score < p2Score) {
		             background(255,0,0);

		        scoreString = "PLAYER 2"
		      }
		      else {
		                     background(0,255,0);

		        scoreString = "PLAYER 1"
		      }
		      text(scoreString + " WINS", width/2, height/2);    
		    break;         
		  }
		}
		function levelDraw () {
		  background(0);
		  drawField();

		  p1.move(p1Up, p1Down);
		  p2.move(p2Up, p2Down);

		  ball.update();
		  p1.update();
		  p2.update();
		  for (var i = 0; i < colliders.length; i++) {
		    colliders[i].update();
		  }


		  for (var i = 0; i < colliders.length; i++) {
		    colliders[i].display();
		  }

		  ball.display(); 

		  checkCollisionWithBall(ball, p1);
		  checkCollisionWithBall(ball, p2);

		  for (var i = 0; i < colliders.length; i++) {
		    checkCollisionWithBall(ball, colliders[i]);
		  }

		  p1.display();
		  p2.display();
		}
		function draw() {
		  // if (keyIsDown(LEFT_ARROW)) {
		  //    keyOn = true;
		  // }
		  checkTransition(currentState);
		  drawScene(currentState);
		}

		function drawField() {
		  stroke(255);
		  noFill();
		  line(0, margin, width, margin);
		  line(0, height - margin, width, height - margin);
		  for (var i = margin; i < height - margin - 15; i += 35) {
		    var start = i;
		    var finish = start + 15;
		    line(width/2, start, width/2, finish);
		  }

		  fill(255);
		  noStroke();
		  textSize(64);
		  textAlign(CENTER, CENTER);
		  text(p1Score, width/2-50, 70);
		  text(p2Score, width/2+50, 70);
		  textSize(16);
		  text("LEVEL: " + currentState,width/2,10);
		}

		function checkCollisionWithBall(ball, other) {
		  if (ball.pos.x + ball.width/2 > other.pos.x && 
		      ball.pos.x + ball.width/2 < other.pos.x + other.width && 
		      ball.pos.y + ball.height/2 > other.pos.y &&
		      ball.pos.y + ball.height/2 < other.pos.y + other.height) {
		    ball.collided(other);
		    other.collided(ball);
		  }
		}

		function Ball() {
		  this.pos = createVector(width/2, height/2);
		  this.vel = createVector(0, 0);
		  this.angle = random(TWO_PI);
		  this.speed = 7;
		  this.vel.x = cos(this.angle) * this.speed;
		  this.vel.y = sin(this.angle) * this.speed;
		  this.width = 15;
		  this.height = 15;

		  this.update = function() {
		    if (this.pos.x < -this.width) {
		      p2Score++;
		      this.resetAfterPoint(0);
		    } else if (this.pos.x > width) {
		      p1Score++;
		      this.resetAfterPoint(1);
		    }

		    if (this.pos.y < margin || 
		        this.pos.y > height - margin - this.height) {
		      this.vel.y *= -1;
		    }

		    this.pos.add(this.vel);
		  };

		  this.display = function() {
		    noStroke();
		    fill(255);
		    rectMode(CORNER);
		    rect(this.pos.x, this.pos.y, this.width, this.height);
		  }

		  this.resetAfterPoint = function(whichPlayer) {
		    this.pos = createVector(width/2, height/2);
		    this.vel = createVector(0, 0);
		    this.speed = 7;
		    if (whichPlayer === 1) {
		      this.getStartingAngle(4 * PI/6, 8 * PI/6);
		    } else if (whichPlayer === 0) {
		      this.getStartingAngle(-PI/3, PI/3);
		    }
		  }

		  this.getStartingAngle = function(angleLow, angleHigh) {  
		    var angle = random(angleLow, angleHigh);
		    this.vel.x = cos(angle) * this.speed;
		    this.vel.y = sin(angle) * this.speed;
		  }

		  this.collided = function(other) {
		    
		  }
		}

		function Paddle(num) {
		  this.num = num;
		  this.width = 15;
		  this.height = 80;
		  if (num == 0) {
		    this.pos = createVector(margin, height/2);
		  } else {
		    this.pos = createVector(width-this.width-margin, height/2);
		  }
		  this.vel = createVector(0, 0);

		  this.update = function() {
		    this.pos.add(this.vel);
		  }

		  this.display = function() {
		    noStroke();
		    fill(255);
		    rectMode(CORNER);
		   // this.pos.x=20;
		        //this.pos.width=100;
		              //  this.pos.height=80;

		   // this.pos.y=20;
		       rect(this.pos.x, this.pos.y, this.width, this.height);

		    //rect(width/2, height/2, this.width, this.height);
		   // print(this.pos.x + "  " + this.pos.y);
		   // rect(width/2,height/2,10,100);
		  }

		  this.move = function(up, down) {
		    this.vel.y = 0;
		    if (up) {
		      if (this.pos.y > margin) {
		        this.vel.y = -5;
		      } else {
		        this.pos.y = margin;
		      } 
		    }
		    if (down) {
		      if (this.pos.y + this.height < height - margin) {
		        this.vel.y = 5;
		      } else {
		        this.pos.y = height - this.height - margin;
		      }
		    } 
		  }

		  this.collided = function(other) {
		    var diff = (other.pos.y + other.height/2) - this.pos.y;
		    if (this.num === 0) {
		      angle = map(diff, 0, this.height, -PI/3, PI/3);
		    }
		    if (this.num === 1) {
		      angle = map(diff, this.height, 0, 4*PI/6, 8*PI/6);
		    }
		    other.speed += 1;
		    other.vel.x = cos(angle) * other.speed;
		    other.vel.y = sin(angle) * other.speed;
		   paddleBounceSFX.play();
		  }
		}

		var colliderNumber = 0;
		function colliderRefresh () {
		//for (var i = 0; i < colliderNumber; i++)  {
		 // var randomInt = (floor(random(9)))
		    switch (floor(random(9))) {
		      case 0:
		        colliders.push(new Bryan());
		        break;
		      case 1:
		        colliders.push(new Yizhou());
		        break;
		      case 2:
		        colliders.push(new Ellie());
		        break;
		      case 3:
		        colliders.push(new Yanwen());
		        break;
		      case 4:
		        colliders.push(new MaddyRed());
		        colliders.push(new MaddyGreen());
		        colliders.push(new MaddyBlue());
		        break;
		      case 5:
		        colliders.push(new AlyssaForrest());
		        break;
		      case 6:
		        colliders.push(new Sarah());
		        break;
		      case 7:
		        colliders.push(new Jackie());
		        break;
		      case 8:
		        colliders.push(new Cat());
		        break;
		    }
		//  }
		}
		function keyPressed() {
		  if (currentState == sceneState.TITLE) {
		    keyOn = true; 
		        print("YES");

		  }
		  else {


		  if (key === 'W') {
		    p1Up = true;
		  }
		  if (key === 'S') {
		    p1Down = true;
		  }

		  if (keyCode === UP_ARROW) {
		    p2Up = true;
		  }
		  if (keyCode === DOWN_ARROW) {
		    p2Down = true;
		  }
		  }
		}

		function keyReleased() {
		  if (key === 'W') {
		    p1Up = false;
		  }
		  if (key === 'S') {
		    p1Down = false;
		  }

		  if (keyCode === UP_ARROW) {
		    p2Up = false;
		  }
		  if (keyCode === DOWN_ARROW) {
		    p2Down = false;
		  }
		}
		//////////////COLLIDERS/////////////////////////////////
		function Bryan() {
		  this.speed = 1;
		  this.angle = 0;
		  this.vel = createVector(0, sin(this.angle) * this.speed);
		  this.width = 10;
		  this.height = 200;
		  this.pos = createVector(random(200, width-200-this.width), random(300, height-300-this.height));

		  this.update = function() {
		    this.angle = (this.angle + 0.05) % TWO_PI;
		    this.vel.y = sin(this.angle) * this.speed;
		    this.pos.add(this.vel);
		  }

		  this.display = function() {
		    fill(color(map(sin(this.angle), -1, 1, 0, 255), map(cos(this.angle), -1, 1, 0, 255), 1));
		    rect(this.pos.x, this.pos.y, this.width, this.height);
		  }

		  this.collided = function(other) {
		    if (other.speed > 1) {
		      other.speed -= 0.5;
		    }

		    other.angle = random(TWO_PI);
		    other.vel.x = cos(other.angle) * other.speed;
		    other.vel.y = sin(other.angle) * other.speed;

		    if (this.height > 0) {
		      this.pos.y += 20;
		      this.height -= 40;      
		    } else {
		      this.height = 0;
		    }

		    if (!hitColliderSFX.isPlaying()) {
		      hitColliderSFX.play();
		    }
		  }
		}

		function Yizhou() {
		  var balls;

		  this.pos = createVector(width/2, height/2);
		  this.speed = 7;
		  this.angle = random(TWO_PI);
		  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
		  this.size = 15;
		  
		  this.update = function() {
		    this.pos.add(this.vel);
		  }

		  this.display = function() {
		    fill(255,30);
		    rectMode(CENTER);
		    rect(width/2,height/2,100,200);
		    noStroke();
		    fill(255);
		    rectMode(CENTER);
		    rect(this.pos.x, this.pos.y, this.size, this.size);
		    for (var i = 0; i < 600,this.pos.x=400 && this.pos.y>150&&this.pos.y<35; i++) {
		      balls[i].update();
		      balls[i].display();
		    }
		  }

		  this.collided = function(other) {
		    balls = new Ball();
		  }
		}


		function Ellie() {
		  this.pos =  createVector(100, 100);
		  this.speed = 1;
		  this.angle = 0;
		  this.vel =  createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
		  this.width = 100;
		  this.height = 80;
		  this.c = color(200, 90, 10);

		  this.update = function() {
		    this.pos.add(this.vel);

		  }

		  this.display = function() {
		    // draw something here
		    fill(this.c);
		    rect(this.pos.x, this.pos.y, this.width, this.height);

		  }

		  this.collided = function(other) {
		    // do something cool here! do something to yourself,
		    // and also something to the other thing?
		    other.size = 3;
		    other.vel.x *= 1;
		    this.c = color(200, 5, 100);
		  }
		}

		function Yanwen() {
		  this.pos = createVector(100, 50);
		  this.speed = 3;
		  this.angle = random(TWO_PI);
		  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
		  this.size1 = 8;
		  this.size2 = 20;
		  this.side = 3;
		  var point = this.side;
		  var scaleStar = 1;

		  this.star = function(x, y, radius1, radius2, npoints) {
		  var angle = TWO_PI / npoints;
		  var halfAngle = angle/2.0;
		  beginShape();
		  for (var a = 0; a < TWO_PI; a += angle) {
		    var sx = x + cos(a) * radius2;
		    var sy = y + sin(a) * radius2;
		    vertex(sx, sy);
		    sx = x + cos(a+halfAngle) * radius1;
		    sy = y + sin(a+halfAngle) * radius1;
		    vertex(sx, sy);
		    }
		    endShape(CLOSE);
		  }

		  this.update = function() {
		    if (this.pos.x < 10) {
		      this.pos = createVector(width/2, height/2);
		      point = 3;
		      scaleStar = 1;
		    } else if (this.pos.x > width - 10) {
		      this.pos = createVector(width/2, height/2);
		      point = 3;
		      scaleStar = 1;
		    }

		    if (this.pos.y < margin + 20 || 
		        this.pos.y > height - margin - 20) {
		      this.vel.y *= -1;
		      point ++;
		      scaleStar += 0.2;

		      if (scaleStar > 4){
		        scaleStar = 1;
		      }
		    }
		    this.pos.add(this.vel);

		    if (point >= 18) {
		      point = 3;
		    }
		  }

		  this.display = function() {
		    // draw something here
		    noStroke();
		    fill(255, 215 - random(100), 0);
		    push();
		    translate(this.pos.x, this.pos.y);
		    rotate(frameCount / 100.0);
		    scale(scaleStar);
		    this.star(0, 0, this.size1, this.size2, point); 
		    pop();
		  }

		  this.collided = function(p) {
		    // do something cool here! do something to yourself,
		    // and also something to the other thing?
		    if (this.pos.x + 20 > p.pos.x && this.pos.x + 20 < p.pos.x + p.width ||
		      this.pos.x - 20 > p.pos.x && this.pos.x - 20 < p.pos.x + p.width){
		      if (this.pos.y > p.pos.y && this.pos.y < p.pos.y + p.height) {
		        this.vel.x *= -1;
		          point ++;
		          scaleStar += 0.2;
		      }
		    }
		  }
		}

		function MaddyRed() {
		  this.pos = createVector(random(200,600),random(100,400));

		  this.speed = 3;
		  this.angle = -100;
		  this.vel = createVector(0, sin(this.angle) * this.speed);
		  this.width = 50;
		  this.height = 50;

		  this.update = function() {
		    //this.pos.add(this.vel);

		    if(this.pos.y < margin || 
		        this.pos.y > height - margin - this.height){
		    this.angle=100;
		  print("hit");

		    }
		  }

		  this.display = function() {
		    fill(255,0,0);
		    ellipse(this.pos.x, this.pos.y, this.width, this.height);
		  }

		  this.collided = function(other) {
		    
		    other.angle = random(TWO_PI);
		    other.vel.x = cos(other.angle) * other.speed;
		    other.vel.y = sin(other.angle) * other.speed;
		    r = 255;
		    g=0;
		    b=0;
		    // if (this.height < 500) {
		    //   this.width += 10;
		    //   this.height += 10;      
		    // } 
		    
		  }
		}

		function MaddyGreen() {
		  this.pos = createVector(random(200,600),random(100,400));

		  this.speed = 3;
		  this.angle = -100;
		  this.vel = createVector(0, sin(this.angle) * this.speed);
		  this.width = 50;
		  this.height = 50;

		  this.update = function() {
		    //this.pos.add(this.vel);

		    if(this.pos.y < margin || 
		        this.pos.y > height - margin - this.height){
		    this.angle=100;
		  print("hit");

		    }
		  }

		  this.display = function() {
		    fill(0,255,0);
		    ellipse(this.pos.x, this.pos.y, this.width, this.height);
		  }

		  this.collided = function(other) {
		    
		    other.angle = random(TWO_PI);
		    other.vel.x = cos(other.angle) * other.speed;
		    other.vel.y = sin(other.angle) * other.speed;
		    g = 255;
		    r =0;
		    b=0;
		    
		  }
		}

		function MaddyBlue() {
		  this.pos = createVector(random(200,600),random(100,400));

		  this.speed = 3;
		  this.angle = -100;
		  this.vel = createVector(0, sin(this.angle) * this.speed);
		  this.width = 50;
		  this.height = 50;

		  this.update = function() {
		    //this.pos.add(this.vel);

		  //   if(this.pos.y < margin || 
		  //       this.pos.y > height - margin - this.height){
		  //   this.angle=100;
		  // print("hit");

		  //   }
		  }

		  this.display = function() {
		    fill(0,0,255);
		    ellipse(this.pos.x, this.pos.y, this.width, this.height);
		  }

		  this.collided = function(other) {
		    
		    other.angle = random(TWO_PI);
		    other.vel.x = cos(other.angle) * other.speed;
		    other.vel.y = sin(other.angle) * other.speed;
		    g = 0;
		    r =0;
		    b=255;
		    
		  }
		}

		function AlyssaForrest() {
		  this.pos = createVector(width/2, height/2);
		  this.speed = 0;
		  this.angle = 0;
		  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
		  this.height = 0;
		  this.width = 0;

		  this.update = function() {
		    this.pos.add(this.vel);
		    if (this.height < height-40){
		    this.height = this.height + 0.5;
		    this.width = this.width + 0.5;
		    } else {
		    this.height = this.height;
		    this.width = this.width;
		    }
		  }

		  this.display = function() {
		    fill(255,0,0);
		    ellipse(this.pos.x, this.pos.y, this.width, this.height);
		  }

		  this.collided = function(other) {
		    other.vel.x *= -1;
		    this.width = this.width - 5;
		    this.height = this.height - 5;
		  }
		}


		function Sarah() {
		  this.speed = 2;
		  this.angle = PI;
		  this.vel = createVector(0, sin(this.angle) * this.speed);
		  this.width = 50;
		  this.height = 50;
		  this.pos = createVector(random(margin, width - margin), random(margin, height - margin));
		  this.counter = 0;
		  this.amplitude = 10;
		  this. r = 0;

		  this.update = function() {
		    this.angle = this.angle + 1;
		    this.pos.add(this.vel);
		    this.counter ++;
		          //check borders
		          if(this.pos.x > (width - (margin + this.width))) {
		            this.vel.x = -2;
		          }
		          if(this.pos.x < margin) {
		            this.vel.x = 2;
		          }

		          if(this.pos.y > (height - (margin + this.height))) {
		            this.vel.y = -2;
		          }
		          if(this.pos.y < margin) {
		            this.vel.y = 2;
		          }

		          if (this.counter % 40 == 0) {
		      //set x vel
		      this.r = random(1);
		      if (this.r > .5) {
		        this.vel.x = 2;
		      } else {
		        this.vel.x = -2;
		      }
		      //set y vel
		      this.r = random(1);
		      if (this.r > .5) {
		        this.vel.y = 2;
		      } else {
		        this.vel.y = -2;
		      }
		    }
		  }

		  this.display = function() {

		    fill(map(this.pos.y, 0, height, 0, 255), 150, map(this.pos.x, 0, width, 0, 255), 200);
		   rect(this.pos.x, this.pos.y, this.width, this.height);



		 }

		 this.collided = function(other) {
		  if (other.speed > 1) {
		    other.speed -= 0.5;
		  }
		  other.angle = random(TWO_PI);
		  other.vel.x = cos(other.angle) * other.speed;
		  other.vel.y = sin(other.angle) * other.speed;
		     //teleport
		     other.pos.y = random(height);
		     if(other.pos.x > width/2) {
		      other.pos.x = random(width/2);
		    } else{
		     other.pos.x = random(width/2, width);
		   }

		   

		   if (!hitColliderSFX.isPlaying()) {
		    hitColliderSFX.play();
		  }
		}
		}



		function Jackie() {
		  this.pos = createVector(0, 0);
		  this.width = 25;
		  this.height = 25;
		  this.time = 0;

		  this.update = function() {
		    this.time += .03;
		    this.pos.x = (200*sin(this.time)) + (width/2)
		    this.pos.y = (200*cos(this.time)) + (height/2)
		  }

		  this.display = function(){
		    rect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
		  }
		  
		  this.collided = function(other){
		    if (other.speed > 1) {
		      other.speed += random(-2, 0);
		    }
		    colliders.push(new Jackie());

		    other.vel.x = -other.vel.x;
		    other.pos.x += other.vel.x;
		    other.vel.y = -other.vel.y;
		    other.pos.y += other.vel.y;
		  }
		}


		function Cat() {
		  this.pos = new createVector(0, 0);
		  this.speed = 0;
		  this.angle = 70;
		  this.vel = new createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
		  this.width = 0;
		  this.height = 0;
		  this.c = color(255, 0, 0);


		  this.update = function() {
		    this.pos.add(this.angle);
		  }

		  this.display = function() {
		    rect(this.pos.x, this.pos.y, this.width, this.height);
		    fill(this.c);
		  }

		  this.collided = function(other) {
		    this.width+10;
		    this.height+20;
		    fill(random(0, 255), random(0, 255), random(0, 255));
		  }
		}

		function Munro () {
		  this.pos = new createVector(0, 0);
		  this.speed = 0;
		  this.width = 15;
		  this.height = 80;
		  this.angle = 40;
		  this.c = color(255, 127, 0);

		  this.update = function() {
		  }

		  this.display = function() {
		  	fill(this.c);
		  		  this.pos = new createVector(p1.pos.y+width/4, p2.pos.y);

		    rect(this.pos.x, this.pos.y, this.width, this.height);
		  }

		  this.collided = function(other) {
		  	print("collided");
		    other.angle = random(TWO_PI);
		    other.vel.x = cos(other.angle) * other.speed;
		    other.vel.y = sin(other.angle) * other.speed;
		  }
		}
