function add(x,y) {
  return x + y;
}

function subtract(x,y) {
  return x - y;
}

function multiply(x,y) {
  return x * y;
}

function divide(x,y) {
  return x / y;
}

function operate(n1, n2, op) {
  n1 = Number(lastScreen.textContent);
  n2 = Number(currentScreen.textContent);
  op = signScreen.textContent;
  switch(op) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "×":
      return Math.round(multiply(n1, n2) * 1000) / 1000;
    case "÷":
      if(n2 !== 0) return Math.round(divide(n1, n2) * 1000) / 1000;
  }
}

function handleDigit(value) {
  currentScreen.textContent += value;
  if(lastScreen.textContent !== "" && currentScreen.textContent) {
    resultScreen.textContent = operate();
  }
}

function handleOperator(value) {
  if(currentScreen.textContent === "" && lastScreen.textContent === "") return;
  if(signScreen.textContent === "") {
    lastScreen.textContent = currentScreen.textContent;
  } else if(currentScreen.textContent !== "" && resultScreen.textContent !== "") {
    lastScreen.textContent = operate();
    resultScreen.textContent = "";
  }
  signScreen.textContent = value;
  currentScreen.textContent = "";
}

function handleEqualButton() {
  if(resultScreen.textContent !== "") {
    currentScreen.textContent = resultScreen.textContent;
    lastScreen.textContent = "";
    signScreen.textContent = "";
    resultScreen.textContent = "";
  }
}

function clearAll() {
  lastScreen.textContent = "";
  currentScreen.textContent = "";
  signScreen.textContent = "";
  resultScreen.textContent = "";
}

function clearLast() {
  currentScreen.textContent = currentScreen.textContent.slice(0, -1);
  if(currentScreen.textContent !== "") {
    resultScreen.textContent = operate();
  } else {
    resultScreen.textContent = "";
  }
}

function addPoint() {
  if(currentScreen.textContent !== "" && !currentScreen.textContent.includes(".")) {
    currentScreen.textContent += ".";
  }
}

function invertSign() {
  if(currentScreen.textContent !== "" && currentScreen.textContent !== "0") {
    currentScreen.textContent = -currentScreen.textContent;
  }
  if(resultScreen.textContent !== "") {
    resultScreen.textContent = operate();
  }
}

const lastScreen = document.querySelector("#last");
const currentScreen = document.querySelector("#current");
const signScreen = document.querySelector("#sign");
const resultScreen = document.querySelector("#result");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const allClearButton = document.querySelector(".all-clear");
const clearButton = document.querySelector(".clear");
const pointButton = document.querySelector(".point");
const invertSignButton = document.querySelector(".invert-sign");

digitButtons.forEach(button => button.addEventListener("click", e => handleDigit(e.target.value)));
operatorButtons.forEach(operator => operator.addEventListener("click", e => handleOperator(e.target.value)));
equalButton.addEventListener("click", handleEqualButton);
allClearButton.addEventListener("click", clearAll);
clearButton.addEventListener("click", clearLast);
pointButton.addEventListener("click", addPoint);
invertSignButton.addEventListener("click", invertSign);

window.addEventListener("keydown", e => {
  e.preventDefault();
  let button;
  if(e.key === "*") {
    button = document.querySelector(`button[value="×"]`);
  } else if(e.key === "/") {
    button = document.querySelector(`button[value="÷"]`);
  } else {
    button = document.querySelector(`button[value="${e.key}"]`);
  }
  if(button) {
    switch(button.classList[0]) {
      case "digit":
        handleDigit(button.value);
        break;
      case "operator":
        handleOperator(button.value);
        break;
      case "equal":
        handleEqualButton();
        break;
      case "all-clear":
        clearAll();
        break;
      case "clear":
        clearLast();
        break;
      case "point":
        addPoint();
        break;
    }
  } else {
    return;
  }
});