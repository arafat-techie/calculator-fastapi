
// Select HTML elements


const numberButtons = document.querySelectorAll(".number");

const operationButtons =
    document.querySelectorAll(".operator");

const clearBtn =
    document.querySelector("#clearBtn");

const calculateBtn =
    document.querySelector("#calculateBtn");

const display =
    document.querySelector("#display");

const result =
    document.querySelector("#result");



// Calculator variables


let firstNumber = "";
let secondNumber = "";
let operation = "";


// Number buttons


numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const number = button.dataset.number;


        // First number
        if (operation === "") {

            firstNumber += number;

            display.value = firstNumber;

        }


        // Second number
        else {

            secondNumber += number;

            display.value = secondNumber;

        }

    });

});



// Operation buttons


operationButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (firstNumber === "") {

            result.textContent =
                "Please enter the first number.";

            return;
        }


        operation = button.dataset.operation;

        display.value = button.textContent;

        console.log("Operation:", operation);

    });

});


// Calculate button

calculateBtn.addEventListener("click", async function() {

    // Check first number
    if (firstNumber === "") {

        result.textContent =
            "Please enter the first number.";

        return;
    }


    // Check operation
    if (operation === "") {

        result.textContent =
            "Please select an operation.";

        return;
    }


    // Check second number
    if (secondNumber === "") {

        result.textContent =
            "Please enter the second number.";

        return;
    }


    // Convert strings to numbers

    const number1 = Number(firstNumber);

    const number2 = Number(secondNumber);


    console.log("Number 1:", number1);
    console.log("Number 2:", number2);
    console.log("Operation:", operation);


    try {

        // Send data to FastAPI

        const response = await fetch(
            "http://127.0.0.1:8000/calculate",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    number1: number1,

                    number2: number2,

                    operation: operation

                })

            }
        );


        // Convert FastAPI response to JavaScript object

        const data = await response.json();


        console.log("FastAPI response:", data);


        // Check error

        if (data.error) {

            result.textContent = data.error;

            return;
        }


        // Show result

        display.value = data.result;

        result.textContent =
            `Result: ${data.result}`;


    }

    catch (error) {

        console.error(error);

        result.textContent =
            "Cannot connect to FastAPI.";

    }

});



// Clear button

clearBtn.addEventListener("click", function() {

    firstNumber = "";

    secondNumber = "";

    operation = "";

    display.value = "0";

    result.textContent = "Result";

});