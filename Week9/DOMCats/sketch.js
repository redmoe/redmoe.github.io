//var data = [];
var buttonElement;
//var selectedDay;
// var selectedMonth;
 var text;
function onButtonPressed() {
	loadJSON('https://anapioficeandfire.com/api/characters/' + int(random(0,460)), newDay);
}
function setup () {
	noCanvas();
	// createCanvas(600,600);
	// var doc = document.body;

    loadJSON('https://anapioficeandfire.com/api/characters/453', newDay);
    buttonElement = createButton('for proper Game of Thrones spelling maybe');
    buttonElement.mousePressed(onButtonPressed);
   // text = createElement('h1', "HEY");
}
function newDay (data) {
	//var t = document.createTextNode(data.name);
	//text.appendChild(t);
		// console.log(text.innerHTML);
		// console.log(text);

	//console.log(data[0].name);
	 text.innerHTML = data.name;
	  createElement('h1', "I'm pretty sure their name is spelled " + text.innerHTML + ".");

	 console.log(text);
	  //text = 
}
// https://anapioficeandfire.com/api/characters/453


var req = new XMLHttpRequest();
req.open('GET','https://dog.ceo/api/breeds/list/all');
req.onload = function() {
	console.log(this.responseText);
	console.log(JSON.parse(this.responseText));
}
req.send();