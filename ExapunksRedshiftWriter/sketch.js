//paste you text here 
var PasteText = "Game Controls x to fire dpad to move";
//toggle wrapping
var wrapping = false;
//the max width of your text if wrapping is false
var spriteWidth = 12;
//clumps two keyCodes together to shorten the Data length. Requires a Swiz to unpack
var condense = false;

function setup () {
	var DataString = []
	PasteText = PasteText.toLowerCase();
	PasteText = PasteText.split(" ")

	var completeData = "DATA";
	var lineLength = 20;
	var wordLength = 0;
	for (var c = 0; c <DataString.length; c++) {
		if (lineLength - DataString[c].length <= lineLength) {
			for (var m = 0; m < lineLength; m++) {
				completeData+=" 0"
			}
			lineLength = 20;
		}
		Encode();

		if (lineLength < DataString[c].toString().length + 1) {
			// if (DataString[c] != 0) {
			// 	DataString[c]
			// }
			lineLength = 20;
			completeData += "\nDATA";
		}
		completeData += " " + DataString[c];
		lineLength -= 1 + DataString[c].toString().length;
		
	}
	console.log(completeData);
}

function Encode (stringToDecode) {
		for (var i = 0; i < stringToDecode.length; i++) {
			if (PasteText[i]==".") {
				stringToDecode.push(39);
			}
			else if (PasteText[i]=="?") {
				stringToDecode.push(38);
			}
			else if (PasteText[i]=="!") {
				stringToDecode.push(37);
			}
			else if (PasteText[i]==" ") {
				stringToDecode.push(0);
			}		
			else if (PasteText[i]== "/") {
				stringToDecode.push(40);						 
			}
			else if (isNaN(PasteText[i])) {
				stringToDecode.push(PasteText.charCodeAt(i)-96);
			}
			else {
				stringToDecode.push(PasteText.charCodeAt(i)-21);
			}			
		}	
		return stringToDecode;
}