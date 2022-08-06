//Fetches references to DOM elements by their classes or ids
const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const back = document.getElementById("back");
const decimal = document.getElementById("decimal");

//Declare a variable `number` of type let and initial value of null
//It will store the number from display.textContent which is a reference to the inner text of the display div
let number = null;

//Declare a variable `operatorButton` of type let and initial value of null
//It will store the reference to the operator button pressed by user
let operatorButton = null;

//Declare variable `numberCount` of type let with initial value 0
//To store the number of inputs entered by user
let numberCount = 0;

//Tells whether the user has selected an operator by checking the classList of operatorButton
// for the class `selected`
function isSelected() {
  if (operatorButton != null)
    if (operatorButton.classList.contains("selected")) return true;
  return false;
}

//Tells whether the user clicked equals button
function isEqualsClicked() {
  if (equals.classList.contains("clicked")) return true;
  return false;
}

//Sets all the variables to their initial values
function initialize() {
  unselect();
  if (isEqualsClicked) equals.classList.remove("clicked");
  number = null;
  operatorButton = null;
  numberCount = 0;
  display.textContent = "0";
}

//Display input from the user by getting the id of the button user presses (e.target.id)
//and storing it into display.textContent
function populate(e) {
  if (display.textContent === "0" || isSelected() || isEqualsClicked()) {
    display.textContent = e.target.id;
    equals.classList.remove("clicked");
  } else display.textContent = display.textContent + e.target.id;
}

//Unselects an operatorButton if it is already selected by removing `selected` from its classList
function unselect() {
  if (isSelected()) operatorButton.classList.remove("selected");
}

//Unhighlight the previous operatorButton if it is highlighted by removing the class of `selected`
//from its classList, and highlight the operatorButton button that the user pressed (e.target.id)
//by storing it into operatorButton adding a class of `selected` to its classList.
function select(e) {
  if (isSelected()) operatorButton.classList.remove("selected");
  operatorButton = e.target;
  operatorButton.classList.add("selected");
}

//Returns an arithmetic calculation of two numbers that depends upon the operatorButton's id.
function operate(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (operatorButton.id === "+") return a + b;
  if (operatorButton.id === "-") return a - b;
  if (operatorButton.id === "*") return a * b;
  if (operatorButton.id === "/") {
    return b == 0 ? "l0l" : a / b;
  }
}

//operate on `number` and display.textcontent. Then, display the result on display screen by storing
// the result from operate into display.textcontent
function evaluate() {
  if (operatorButton != null) {
    display.textContent = operate(number, display.textContent);
    equals.classList.add("clicked");
    number = display.textContent;
    numberCount = 0;
  }
}

//Adds a `click` eventListener to all the buttons of class `digit`
[...digits].map((digit) =>
  digit.addEventListener("click", (e) => {
    populate(e);
    unselect();
  })
);

//Adds `click` eventListener to all the buttons of class `operator`
[...operators].map((operator) =>
  operator.addEventListener("click", (e) => {
    numberCount++;
    if (numberCount == 2) {
      display.textContent = operate(number, display.textContent);
      number = display.textContent;
      numberCount = 1;
    } else number = display.textContent;
    select(e);
  })
);

//Adds `click` eventListener to the button of class `equals`
equals.addEventListener("click", evaluate);

//Adds `click` eventListener to the button of class `clear`
clear.addEventListener("click", initialize);

//Adds `click` eventListener to the button of class `back`
//Take the value of display.textContent and remove the last character by using the slice method
//Then store the result into display.textContent for it to appear on the screen
back.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent.length === 0) display.textContent = 0;
});

//Adds `click` eventListener to the button of class `decimal`
//Only inputs a decimal point when there is not any prior decimal point in the display.textContent
decimal.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    if (isSelected() || isEqualsClicked()) {
      display.textContent = "0.";
      equals.classList.remove("clicked");
    } else display.textContent = display.textContent + ".";
  }
});
