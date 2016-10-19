const dictionary = [
	[
		["A", "P", "P", "L", "E"],
		["O", "R", "A", "N", "G", "E"],
		["B", "A", "N", "A", "N", "A"],
		["P", "E", "A", "R"],
		["G", "R", "A", "P", "E"]
	],

	[
		["R", "E", "D"],
		["O", "R", "A", "N", "G", "E"],
		["C", "Y", "A", "N", "I", "D", "E"],
		["G", "R", "E", "E", "N"],
		["P", "U", "R", "P", "L", "E"],
		["B", "L", "A", "C", "K"],
		["W", "H", "I", "T", "E"]
	],

	[
		["B", "A", "S", "K", "E", "T", "B", "A", "L", "L"],
		["T", "E", "N", "N", "I", "S"],
		["G", "O", "L", "F"],
		["S", "O", "C", "C", "E", "R"]
	],

	[
		["O", "B", "A", "M", "A"],
		["W", "A", "S", "H", "I", "N", "G", "T", "O", "N"],
		["B", "U", "S", "H"]
	],

	[
		["J", "A", "V", "A"],
		["C", "+", "+"],
		["P", "Y", "T", "H", "O", "N"],
		["L", "I", "S", "P"]
	]
]


let category;

function fruitCategory() {
	category = 0;
	chooseCategory(category);
}

function colorCategory() {
	category = 1;
	chooseCategory(category);
}

function sportsCategory() {
	category = 2;
	chooseCategory(category);
}

function presidentCategory() {
	category = 3;
	chooseCategory(category);
}

function csLanguagesCategory() {
	category = 4;
	chooseCategory(category);
}

let spaces = [];	// an array to hold underscored spaces
let chosen;

let count = 0;


function chooseCategory(num){
	let random = Math.floor((Math.random()*(dictionary[num].length)));
	chosen = dictionary[num][random];
	spaces = Array(chosen.length);
	for (let i = 0; i < spaces.length; i++){
		spaces[i] = "_ ";
	}

	printspaces();
}


// prints the guessfield
function printspaces(){
	for (let i = 0; i < spaces.length; i++){
		let guess_space = document.getElementById("guess_space");	// must have an element node
		let text_node = document.createTextNode(spaces[i]);		// to create a text node to add into HTML
		guess_space.appendChild(text_node);			// append text node to element in HTML
	}
}

// checks if the the letter provided by the user matches one or more of the letters in the word
let checkLetter = function(){
	let f = document.guess_form;		// form from HTML
	let b = f.elements["input_letter"];	// the "input_letter" element from the form
	let letter = b.value; 				// the letter provided by the user into "input_letter" element
	letter = letter.toUpperCase();
	let found = false;
	// here, we check if the user's guessed letter is a letter in the word (chosen)
	for (let i = 0; i < chosen.length; i++){
		if(chosen[i] === letter){
			found = true;
			spaces[i] = letter + " ";	// replace spaces[i] with the letter found
		}
	}
	b.value = "";		// empty out text input box for next round
	
	// deletes the guessfield and replaces it with the new one
	let guess_space = document.getElementById("guess_space");
	guess_space.innerHTML=""; 
	printspaces();
	
	// if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list and hangman grows
	if(!found){
		let wrong_letters = document.getElementById("wrong_letters");	// get wrong_letters id from HTML
		let text_node = document.createTextNode(" " + letter);	// create a text node consisting of space + letter
		wrong_letters.appendChild(text_node);
		count++;	// increment count of wrong letters
		let hangman = document.getElementById("hangman");
		// change the image src of hangman element in HTML
    	hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman" + count + ".png";
	}
	
	//checks if all letters have been found
	let word_found = true;
	for (let i = 0; i < spaces.length; i++){
		if(spaces[i] === "_ "){
			word_found = false;
		}
	}
	if(word_found){
		window.alert("You win!");
	}
	if(count === 6){ //once you got six wrong letters, you lose
		window.alert("Uh...I guess you're dead now.");
	}
}

function init(){
	//printspaces();
}
window.onload = init;

