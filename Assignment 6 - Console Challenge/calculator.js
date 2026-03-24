// Basic Calculator Functions

// Addition
function add(a, b) {
    return a + b;
}

// Subtraction
function subtract(a, b) {
    return a - b;
}

// Multiplication
function multiply(a, b) {
    return a * b;
}

// Division
function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero";
    }
    return a / b;
}

// General Calculator Function
function calculator(a, b, operation) {
    switch (operation) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
        default:
            return "Invalid operation";
    }
}

// Sample Outputs (for console testing)
console.log("Addition:", add(5, 3));
console.log("Subtraction:", subtract(10, 4));
console.log("Multiplication:", multiply(6, 7));
console.log("Division:", divide(20, 5));

// Using main calculator function
console.log("Calculator (Add):", calculator(10, 5, "add"));
console.log("Calculator (Multiply):", calculator(10, 5, "multiply"));