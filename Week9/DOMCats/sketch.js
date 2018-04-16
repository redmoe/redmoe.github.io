var data = [];
var buttonElement;
var selectedDay;
var selectedMonth;
var text;
function onButtonPressed() {
	loadJSON('https://api.abalin.net/get/namedays?day=' + selectedDay + '&month=' + selectedMonth,newDay);
}
function setup () {
	noCanvas();
	createCanvas(600,600);
	var doc = document.body;

    loadJSON('https://anapioficeandfire.com/api/characters/453', newDay);
    buttonElement = createButton('names of today');
    buttonElement.mousePressed(onButtonPressed);
    text = createElement('h1', 'The names of today are:');
}
function newDay (data) {
	text = data.name[0];
}
// https://anapioficeandfire.com/api/characters/453