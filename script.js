const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

//Declare a variable `number` of type let and initial value of null
// It will store the number from display.textContent which is a reference to the inner text of the display div
let number = null;
//Declare a variable `operatorID` of type let and initial value of null
//It will store the id of the operator button pressed by user
let operatorID = null;

function getOperatorButton() {
  return document.getElementById(operatorID);
}
function isSelected() {
  if (operatorID != null)
    if (getOperatorButton().classList.contains("selected")) return true;
  return false;
}
//Display input from the user by getting the id of the button user presses (e.target.id)
//and storing it into display.textContent
function populate(e) {
  if (display.textContent === "0" || isSelected())
    display.textContent = e.target.id;
  else display.textContent = display.textContent + e.target.id;
}

function unselect() {
  if (isSelected()) getOperatorButton().classList.remove("selected");
}
//Unhighlight the previous operatorID if it is highlighted by removing the class of `selected`
//from its classList, and highlight the operatorID button that the user pressed (e.target.id)
//by storing it into operatorID adding a class of `selected` to its classList.
function select(e) {
  if (isSelected()) getOperatorButton().classList.remove("selected");
  operatorID = e.target.id;
  console.log(operatorID);
  getOperatorButton().classList.add("selected");
}

function operate(a, b) {
  a = parseInt(a);
  b = parseInt(b);
  if (operatorID === "+") return a + b;
  if (operatorID === "-") return a - b;
  if (operatorID === "*") return a * b;
  if (operatorID === "/") return a / b;
}

[...digits].map((digit) =>
  digit.addEventListener("click", (e) => {
    populate(e);
    unselect();
  })
);

[...operators].map((operator) =>
  operator.addEventListener("click", (e) => {
    number = display.textContent;
    select(e);
  })
);
