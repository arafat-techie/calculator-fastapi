from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


# Allow frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Data coming from JavaScript
class CalculatorData(BaseModel):
    number1: float
    number2: float
    operation: str


# Home route
@app.get("/")
def home():
    return {
        "message": "Calculator API is working!"
    }


# Calculator API
@app.post("/calculate")
def calculate(data: CalculatorData):

    number1 = data.number1
    number2 = data.number2
    operation = data.operation


    if operation == "add":

        result = number1 + number2


    elif operation == "subtract":

        result = number1 - number2


    elif operation == "multiply":

        result = number1 * number2


    elif operation == "divide":

        if number2 == 0:

            return {
                "error": "Cannot divide by zero"
            }

        result = number1 / number2


    else:

        return {
            "error": "Invalid operation"
        }


    return {
        "number1": number1,
        "number2": number2,
        "operation": operation,
        "result": result
    }