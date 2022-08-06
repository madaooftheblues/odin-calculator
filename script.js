const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const back = document.getElementById("back");
const decimal = document.getElementById("decimal");

//Declare a variable `number` of type let and initial value of null
// It will store the number from display.textContent which is a reference to the inner text of the display div
let number = null;
//Declare a variable `operatorButton` of type let and initial value of null
//It will store the reference to the operator button pressed by user
let operatorButton = null;

let numberCount = 0;

function isSelected() {
  if (operatorButton != null)
    if (operatorButton.classList.contains("selected")) return true;
  return false;
}

function isEqualsClicked() {
  if (equals.classList.contains("clicked")) return true;
  return false;
}

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

[...digits].map((digit) =>
  digit.addEventListener("click", (e) => {
    populate(e);
    unselect();
  })
);

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

equals.addEventListener("click", evaluate);

clear.addEventListener("click", initialize);

back.addEventListener("click", (e) => {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent.length === 0) display.textContent = 0;
});

decimal.addEventListener("click", (e) => {
  if (!display.textContent.includes(".")) {
    if (isSelected() || isEqualsClicked()) {
      display.textContent = "0.";
      equals.classList.remove("clicked");
    } else display.textContent = display.textContent + ".";
  }
});
