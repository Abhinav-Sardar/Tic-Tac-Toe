/**
 * left        mid          right
 *
 * ---------------------------------------------
 *
 *                    top
 *                    middy
 *                    bottom
 *
 * ---------------------------------------------
 *
 *
 *left diagnol
 *             right-diagnol
 *
 */
// let message = document.querySelector('.message') ;
let message = document.getElementById("message");
let table = document.querySelector("table");
let buttons = document.querySelectorAll("td");
let middleMost = document.getElementById("middlemost");
let topRow = document.querySelectorAll(".top");
let middleRow = document.querySelectorAll(".middy");
let bottomRow = document.querySelectorAll(".bottom");
let leftColumn = document.querySelectorAll(".left");
let rightColumn = [
	document.getElementById("r1"),
	document.getElementById("r2"),
	document.getElementById("r3"),
];
let middleColumn = document.querySelectorAll(".mid");
let leftDiagnol = document.querySelectorAll(".left-diagnol");
let rightDiagnol = document.querySelectorAll(".right-diagnol");
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
	window.location.assign("./index.html");
});
// console.log(rightColumn) ;
let currentClicker;
let user = {
	score: 0,
	operator: "",
};
let bot = {
	score: 0,
	operator: "",
};

let truthsy = "#35ff35";
let falsy = "#FF6263";

const O = '<i class="far fa-circle"></i>';
const X = '<i class="fas fa-times"></i>';
let operators = [X, O];

document.addEventListener("DOMContentLoaded", () => {
	// Kickoff() ;
	ShowInitialMessage();
});

let userClick = (element) => {
	if (currentClicker === "user") {
		if (element.innerHTML === "") {
			// alert('hi')
			element.innerHTML = user.operator;
			currentClicker = "bot";
			setTimeout(() => {
				botClick();
			}, 700);
		}
	}
};

let botClick = () => {
	if (currentClicker === "bot") {
		if (middleMost.innerHTML === "") {
			// alert('Middle box is empty')
			middleMost.innerHTML = bot.operator;
			currentClicker = "user";
			buttons.forEach((button) => (button.onclick = () => userClick(button)));
		} else {
			let randomButton = returnRandomEmptyButton();
			randomButton.innerHTML = bot.operator;
			currentClicker = "user";
			buttons.forEach((button) => (button.onclick = () => userClick(button)));
		}
	}
};
function returnRandomEmptyButton() {
	while (true) {
		let randomNumber = Math.floor(Math.random() * buttons.length);
		let randomButton = buttons[randomNumber];
		if (randomButton.innerHTML === "") {
			return randomButton;
		} else {
			continue;
		}
	}
}

function OccupiedBtns() {
	alert("Tie!");
	currentClicker = "";
}

function ShowInitialMessage() {
	let randomOperator = operators[Math.floor(Math.random() * 2)];
	user.operator = randomOperator;
	bot.operator = randomOperator === X ? O : X;
	console.log(user, bot);
	currentClicker = ["bot", "user"][Math.floor(Math.random() * 2)];
	let userKaOperator = randomOperator === X ? "X" : "O";
	let botKaOperator = randomOperator === X ? "O" : "X";
	let h1 = message.getElementsByTagName("h1");
	h1[0].innerHTML = `You are '${userKaOperator}' and the bot is '${botKaOperator}'.<br>
    ${currentClicker === "user" ? "You" : "Bot"} will start first
    `;
	document.getElementById("close").addEventListener("click", () => {
		message.style.display = "none";
		document.body.style.backgroundColor = "white";
		table.style.opacity = "1";
		resetBtn.style.opacity = "1";
		setGameArea(false);
	});
}

function setGameArea(isReset) {
	buttons.forEach((button) => {
		button.style.backgroundColor = "white";
		button.innerHTML = "";
	});
	buttons.forEach((button, index) => {
		if (currentClicker === "user") {
			button.onclick = () => userClick(button, index);
		} else {
			setTimeout(() => {
				botClick();
			}, 700);
		}
	});
}

// middleColumn.forEach(column => column.style.backgroundColor = 'red');

function WinnerChecker() {
	let intervalSetter = setInterval(() => {
		if (
			leftColumn[0].innerHTML === user.operator &&
			leftColumn[1].innerHTML === user.operator &&
			leftColumn[2].innerHTML === user.operator
		) {
			alert("You Won!");
			clearInterval(intervalSetter);
			leftColumn.forEach((column) => {
				column.style.backgroundColor = truthsy;
				currentClicker = "";
			});
		} else if (
			leftColumn[0].innerHTML === bot.operator &&
			leftColumn[1].innerHTML === bot.operator &&
			leftColumn[2].innerHTML === bot.operator
		) {
			leftColumn.forEach((column) => {
				column.style.backgroundColor = falsy;
				currentClicker = "";
			});
			alert("You lost!");
			clearInterval(intervalSetter);
			fjeofjerf;
		} else if (
			middleColumn[0].innerHTML === user.operator &&
			middleColumn[1].innerHTML === user.operator &&
			middleColumn[2].innerHTML === user.operator
		) {
			middleColumn.forEach((cell) => {
				cell.style.backgroundColor = truthsy;
			});
			alert("You Won!");
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			middleColumn[0].innerHTML === bot.operator &&
			middleColumn[1].innerHTML === bot.operator &&
			middleColumn[2].innerHTML === bot.operator
		) {
			middleColumn.forEach((cell) => {
				cell.style.backgroundColor = falsy;
			});
			alert("You Won!");
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			rightColumn[0].innerHTML === user.operator &&
			rightColumn[1].innerHTML === user.operator &&
			rightColumn[2].innerHTML === user.operator
		) {
			rightColumn.forEach((cell) => {
				cell.style.backgroundColor = "red";
			});
			alert("You Won!");
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			rightColumn[0].innerHTML === bot.operator &&
			rightColumn[1].innerHTML === bot.operator &&
			rightColumn[2].innerHTML === bot.operator
		) {
			rightColumn.forEach((cell) => {
				cell.style.backgroundColor = "red";
			});
			alert("You Won!");
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			topRow[0].innerHTML === user.operator &&
			topRow[1].innerHTML === user.operator &&
			topRow[2].innerHTML === user.operator
		) {
			alert("You won!");
			topRow.forEach((cell) => (cell.style.backgroundColor = truthsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			topRow[0].innerHTML === bot.operator &&
			topRow[1].innerHTML === bot.operator &&
			topRow[2].innerHTML === bot.operator
		) {
			alert("You lost!");
			topRow.forEach((cell) => (cell.style.backgroundColor = falsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			middleRow[0].innerHTML === user.operator &&
			middleRow[1].innerHTML === user.operator &&
			middleRow[2].innerHTML === user.operator
		) {
			alert("You won!");
			middleRow.forEach((cell) => (cell.style.backgroundColor = truthsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			middleRow[0].innerHTML === bot.operator &&
			middleRow[1].innerHTML === bot.operator &&
			middleRow[2].innerHTML === bot.operator
		) {
			alert("You lost!");
			middleRow.forEach((cell) => (cell.style.backgroundColor = falsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			bottomRow[0].innerHTML === user.operator &&
			bottomRow[1].innerHTML === user.operator &&
			bottomRow[2].innerHTML === user.operator
		) {
			alert("You won!");
			bottomRow.forEach((cell) => (cell.style.backgroundColor = truthsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			bottomRow[0].innerHTML === bot.operator &&
			bottomRow[1].innerHTML === bot.operator &&
			bottomRow[2].innerHTML === bot.operator
		) {
			alert("You lost!");
			middleRow.forEach((cell) => (cell.style.backgroundColor = falsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			leftDiagnol[0].innerHTML === user.operator &&
			leftDiagnol[1].innerHTML === user.operator &&
			leftDiagnol[2].innerHTML === user.operator
		) {
			alert("You won!");
			leftDiagnol.forEach((cell) => (cell.style.backgroundColor = truthsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			leftDiagnol[0].innerHTML === bot.operator &&
			leftDiagnol[1].innerHTML === bot.operator &&
			leftDiagnol[2].innerHTML === bot.operator
		) {
			alert("You lost!");
			leftDiagnol.forEach((cell) => (cell.style.backgroundColor = falsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			rightDiagnol[0].innerHTML === user.operator &&
			rightDiagnol[1].innerHTML === user.operator &&
			rightDiagnol[2].innerHTML === user.operator
		) {
			alert("You won!");
			rightDiagnol.forEach((cell) => (cell.style.backgroundColor = truthsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else if (
			rightDiagnol[0].innerHTML === bot.operator &&
			rightDiagnol[1].innerHTML === bot.operator &&
			rightDiagnol[2].innerHTML === bot.operator
		) {
			alert("You lost!");
			rightDiagnol.forEach((cell) => (cell.style.backgroundColor = falsy));
			clearInterval(intervalSetter);
			currentClicker = "";
		} else {
			let str = "";
			buttons.forEach((button) => {
				if (button.innerHTML !== "") {
					str += true;
				} else {
					str += false;
				}
			});
			if (!str.includes("false")) {
				clearInterval(intervalSetter);
				alert("Tie!");
				currentClicker = "";
				buttons.forEach((button) => (button.style.backgroundColor = "yellow"));
			} else {
				return;
			}
		}
	});
}
WinnerChecker();
