import "./style.css";

let currentInput = "0"; // The current number or operator being input
let equation = "";      // The full equation displayed at the top
let resultDisplayed = false; // Tracks if the result has been displayed

function clearDisplay() {
  currentInput = "0";
  equation = "";
  resultDisplayed = false;
  updateDisplays();
}

function handleNumber(num) {
  if (resultDisplayed) {
    // Start a new equation if a number is pressed after the result
    currentInput = num;
    equation = num;
    resultDisplayed = false;
  } else if (currentInput === "0") {
    // Replace initial zero
    currentInput = num;
  } else {
    // Append the number to the current input
    currentInput += num;
  }
  equation += num;
  updateDisplays();
}

function handleOperator(op) {
  if (resultDisplayed) {
    // Continue with the result for a new calculation
    equation = currentInput + " " + op + " ";
    resultDisplayed = false;
  } else if (currentInput !== "") {
    // Append operator to the equation
    equation += " " + op + " ";
  }
  currentInput = ""; // Reset current input for the next number
  updateDisplays();
}

function handleDecimal() {
  if (resultDisplayed) {
    // Start new input with a decimal
    currentInput = "0.";
    equation = "0.";
    resultDisplayed = false;
  } else if (!currentInput.includes(".")) {
    // Add decimal if it doesn't exist in the current input
    currentInput = currentInput === "" ? "0." : currentInput + ".";
    equation += ".";
  }
  updateDisplays();
}

function calculateResult() {
  try {
    // Use eval to calculate the equation (safeguarded)
    const sanitizedEquation = equation.replace(/×/g, "*").replace(/÷/g, "/");
    const result = eval(sanitizedEquation);

    currentInput = result.toString();
    equation = sanitizedEquation + " ="; // Display the full equation with "="
    resultDisplayed = true;
    updateDisplays();
  } catch (error) {
    // Handle invalid input
    currentInput = "Error";
    equation = "";
    updateDisplays();
  }
}

function updateDisplays() {
  const display = document.getElementById("display");
  const equationDisplay = document.getElementById("equation-display");

  display.value = currentInput || "0"; // Show current input or 0
  equationDisplay.value = equation;   // Show the full equation
}

