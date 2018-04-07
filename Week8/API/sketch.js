var weather;
function setup () {
	createCanvas(800,800);
	loadJSON('http://api.wunderground.com/api/c43104dd10db4af4/conditions/q/NY/New_York.json',DataParse);
}
function DataParse (data) {
	weather = data;
}
function draw () {
	background(0);
	if (weather) {
		fill(255);
		textAlign(CENTER);
		ellipse(width/2,height/2,weather.current_observation.temp_f)
		text("The temperature in New York is " + weather.current_observation.temp_f + "F", width/2,height/2-weather.current_observation.temp_f)
	}
}