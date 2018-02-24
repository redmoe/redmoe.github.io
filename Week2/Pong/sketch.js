var paddle1;
var paddle2;

var border = 20;

var score1 = 0;
var score2 = 0;

function Ball() {
	this.x = width / 2;
	this.y = height / 2;
	this.speed = 3;
	this.angle = 0;
	this.diam = 15;

	this.Reset = function() {
		this.x = width / 2;
		this.y = height / 2;
		this.speed = 3;
	}
	this.Move = function() {
		if (this.x < 0) {
			score2++;
			this.angle = 0;
			this.Reset();
		} else if (this.x > width) {
			score1++;
			this.angle = PI;
			this.Reset();
		}
		if (this.y - (this.diam / 2) < border || this.y + (this.diam / 2) > height - border) {
			this.angle = -this.angle;
		}
		this.x += cos(this.angle) * this.speed;
		this.y += sin(this.angle) * this.speed;
		color(255);
		ellipse(this.x, this.y, this.diam, this.diam);
	}
}

function Paddle(tempX, angTemp) {
	this.up = false;
	this.down = false;
	this.x = tempX;
	this.hei = 100;
	this.y = height / 2 - this.hei / 2;
	this.wid = border;
	this.speed = 4;
	this.angleOffset = angTemp;

	this.Move = function() {
		if (this.up == true && this.y > 0 + border) {
			this.y -= this.speed;
		}
		if (this.down == true && this.y < height - this.hei - border) {
			this.y += this.speed;
		}
		if ((ball.y > this.y && ball.y < this.y + this.hei) && (ball.x + (ball.diam / 2) > this.x && ball.x - (ball.diam / 2) < this.x + this.wid)) {
			ball.speed = 0.4 + ball.speed;
			var relativeIntersectY = ((this.y + (this.hei / 2)) - ball.y);
			var normalizedRelativeIntersectionY = (relativeIntersectY / (this.hei / 2));
			ball.angle = (normalizedRelativeIntersectionY + this.angleOffset);
		}
		rect(this.x, this.y, this.wid, this.hei);
	}
}


function setup() {
	background(255, 0, 0);
	createCanvas(600, 400);
	paddle2 = new Paddle(0, 0);
	paddle1 = new Paddle(width - border, PI);
	ball = new Ball();
}
var ball;

function keyPressed() {
	if (keyCode == UP_ARROW) {
		paddle1.up = true;
	}
	if (keyCode == DOWN_ARROW) {
		paddle1.down = true;
	}
	if (key == 'W' || key == 'w') {
		paddle2.up = true;
	}
	if (key == 'S' || key == 's') {
		paddle2.down = true;
	}
}

function keyReleased() {
	/// if (key==CODED) {
	if (keyCode == UP_ARROW) {
		paddle1.up = false;
	}
	if (keyCode == DOWN_ARROW) {
		paddle1.down = false;
	}
	//  }
	if (key == 'W' || key == 'w') {
		paddle2.up = false;
	}
	if (key == 'S' || key == 's') {
		paddle2.down = false;
	}
}

function draw() {
	background('#ed225d');
	fill(255);
	noStroke();
	for (var i = 0; i < 10; i++) {
		rect(width / 2 - (border / 4), i * height / 9 - 5, border / 2, 10);
	}
		textAlign(CENTER, CENTER);
	if (score1 > 9) {
		textSize(40);
		text("PLAYER 1 WINS!", width / 2, height / 2);	
	}
	else if (score2 > 9) {
		textSize(40);
		text("PLAYER 2 WINS!", width / 2, height / 2);	
	}
	else {
	paddle1.Move();
	paddle2.Move();
	ball.Move();
	}
	noStroke();
	rect(0, 0, width, border);
	rect(0, height - border, width, border);
	fill(0);
	textSize(border - 2);
	fill('#ed225d')
	text(score1, (width / 4), border / 2);
	text(score2, width / 2 + (width / 4), border / 2);
	text("P5JS PONG", width / 2, height - border / 2);
}