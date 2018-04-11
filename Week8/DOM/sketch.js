var buttons = {};


function clicked() {
	console.log('clicked');
}
var doc = document.body;
for (var i = 0; i < 100; i++) {
	var button = document.createElement('button');
	button.innerHTML = "Buttton " + i;
	button.onclick = clicked;
	doc.appendChild(button);
}
function setup () {
	//noCanvas();
	createCanvas(600,600);
	for (var i = 0; i < 100; i++) {
		var newImg = createImg("https://media.giphy.com/media/JfDNFU1qOZna/giphy.gif");
		var newButton = createButton("ITS A BUTTON" + i);
		newButton.style('font-size',i +'px');
		//newImg.resize(50+i,50+i);
		newButton.mousePressed(buttonPressed);
		buttons[i] = false;
	}
}
function buttonPressed () {
	this.html("HEY");
	this.style('background-color','red');
	elipse(random(width),random(height),100,100);
	buttons[parseInt(this.elt.innerHTML)] = true;
}
function draw () {
	for (var i = 0; i < buttons.length;i++) {
		if (buttons[i] === true) {
			fill(i*25);
			rect(random(width),random(height),100,100);

		}
	}
}