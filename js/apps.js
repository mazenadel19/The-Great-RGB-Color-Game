// jshint esversion: 6

let numSquares = 6;
let colors = [];

let colorDisplay = document.getElementById('colorDisplay');
const squares = document.getElementsByClassName('square');
let pickedColor;
colorDisplay.textContent = pickedColor;

const messageDisplay = document.getElementById('message');
const h1 = document.getElementsByTagName('h1')[0];
const resetButton = document.querySelector('#reset');
const modeBtns = document.querySelectorAll('.mode');

Init();

function Init() {
	setupModeButtons();
	setupSquares();
	reset();
}

//*picking the game mode and adding the reset function to each mode*/
function setupModeButtons() {
	for (let i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener('click', function() {
			modeBtns[0].classList.remove('selected');
			modeBtns[1].classList.remove('selected');
			this.classList.add('selected');

			if (this.textContent === 'Easy') {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
		});
	}
}

function setupSquares() {
	//* add  initial cololrs to squares
	//* add  click listener to squares
	//*compare colors ---the game logic
	for (let i = 0; i < squares.length; i++) {
		//* add  click listener to squares
		squares[i].addEventListener('click', function() {
			console.log('clicked', this);

			//* grab color of clicked square
			const clickedColor = this.style.backgroundColor;
			console.log('clickedColor:' + clickedColor);
			console.log('pickedColor:' + pickedColor);

			//*compare colors
			if (clickedColor == pickedColor) {
				console.log('congrats');
				messageDisplay.textContent = 'Congrats!!';
				h1.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
				resetButton.textContent = 'Play again?';
			} else {
				console.log('try again');

				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'try again :(';
			}
		});
	}
}

//* change background style for all squares when user hits correct answer */
function changeColors(color) {
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

//* pick a random color form colors array*/
function pickColor() {
	const randomNumber = Math.floor(Math.random() * colors.length);
	return colors[randomNumber];
}

//*generate 3 or 6 colors according to user's choice */
function generateRandomColors(num) {
	//*make array
	const arr = [];
	//*add colors to the array
	for (let i = 0; i < num; i++) {
		arr[i] = makeRandomColor();
	}
	//*return array
	return arr;
}

//* make a random color*/
function makeRandomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	let color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	return color;
}

//*reseting the game  to default state*/
function reset() {
	h1.setAttribute('style', 'backgroundColor:#232323');

	//generate random colors
	colors = generateRandomColors(numSquares);

	//pick a new random color from the array
	pickedColor = pickColor();
	//change colorDisplayed to match picked color
	colorDisplay.textContent = pickedColor;

	//changes colors of squares
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = 'block';
		} else {
			squares[i].style.display = 'none';
		}

		//delete congratulation message
		messageDisplay.textContent = '';

		//convert play again button to original form
		resetButton.textContent = 'New Game';
	}
}

//*adding reset function to reset button */
resetButton.addEventListener('click', function() {
	reset();
});
