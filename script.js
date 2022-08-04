const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

let numberA = null;
let numberB = null;
let operator = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = parseInt(a);
  b = parseInt(b);
  if (operator == "+") return add(a, b);
  if (operator == "-") return subtract(a, b);
  if (operator == "*") return multiply(a, b);
  if (operator == "/") return divide(a, b);
}

function populate(e) {
  if (state === 1) display.textContent = "";
  display.textContent =
    display.textContent == 0 ? e.target.id : display.textContent + e.target.id;
  state = 0;
}
