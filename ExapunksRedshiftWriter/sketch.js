var PasteText = "Game Controls x to fire dpad to move";
//paste you text here like
//

function setup () {
	var DataString = []
	PasteText = PasteText.toLowerCase();
	for (var i = 0; i < PasteText.length; i++) {
		if (PasteText[i]==".") {
			DataString.push(39);
		}
		else if (PasteText[i]=="?") {
			DataString.push(38);
		}
		else if (PasteText[i]=="!") {
			DataString.push(37);
		}
		else if (PasteText[i]==" ") {
			DataString.push(0);
		}		
		else if (PasteText[i]== "/") {
			DataString.push(40);						 
		}
		else if (isNaN(PasteText[i])) {
			DataString.push(PasteText.charCodeAt(i)-96);
		}
		else {
			DataString.push(PasteText.charCodeAt(i)-21);
		}
	
	}
	var completeData = "DATA";
	var lineLength = 20;
	for (var c = 0; c <DataString.length; c++) {
		if (lineLength < DataString[c].toString().length + 1) {
			lineLength = 20;
			completeData += "\nDATA";
		}
		completeData += " " + DataString[c];
		lineLength -= 1 + DataString[c].toString().length;
		
	}
	console.log(completeData);
}
