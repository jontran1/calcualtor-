const calculator = document.querySelector(".calculator");

const clearButton = document.getElementById("clearButton");
const backButton = document.getElementById("backButton");
const division = document.getElementById("division");
const multiplication = document.getElementById("multiplication");
const addition = document.getElementById("addition");
const subtraction = document.getElementById("subtraction");
const decimal = document.getElementById("decimalButton");
const equals = document.getElementById("equalsButton");

const calculatorScreen = document.getElementById("calculatorScreen").elements["calculatorScreenContent"];

const zeroButton = document.getElementById("zeroButton");
const oneButton = document.getElementById("oneButton");
const twoButton = document.getElementById("twoButton");
const threeButton = document.getElementById("threeButton");
const fourButton = document.getElementById("fourButton");
const fiveButton = document.getElementById("fiveButton");
const sixButton = document.getElementById("sixButton");
const sevenButton = document.getElementById("sevenButton");
const eightButton = document.getElementById("eightButton");
const nineButton = document.getElementById("nineButton");

var statement = [];
let inprogress = false;
let errorMessage = "Nice try guy.";
clearScreen();

backButton.addEventListener("click", ()=> {
    content = calculatorScreen.value;
    if(content.length == 0) return;
    calculatorScreen.value = content.substring(0, content.length-1);
})

/**
 * If inprogress is true. Then the equation 
 * is invalid.
 * 
 * If inprogress is false then evalulate the 
 * statement.
 */
equals.addEventListener("click", () => {
    if(inprogress){
        clearScreen();
        addToScreen(NaN);
    }
    addToStatement(getNumberFromScreen());
    clearScreen();
    let answer = evalulate(statement);
    addToScreen(answer);
    clean();
})

/**
 * Appends content to the statement array.
 * @param {String} content 
 */
function addToStatement(content){
    statement.push(content);
}

/**
 * Returns the evalulated statment. If statement is 
 * invalid then an error message is returned.
 * @param {Array[String]} statement 
 */
function evalulate(statement){
    let answer = evalulateHelper(statement, 0, statement.length-1);
    if(answer === Infinity){
        return errorMessage;
    }
    return answer;
}

/**
 * Recurisvly evalulate the statment. 
 * For example ['2','+','2','+','2'] should returns 6.
 * For example ['12','+','7','-','5','*','3'] returns 42.
 * @param {Array} eval 
 * @param {int} start 
 * @param {int} end 
 */
function evalulateHelper(eval, start, end){
    if(end-start+1 == 2) return NaN;
    if(start == end) return parseFloat(eval[start]);
    if(start < end){
        let op = eval[end-1];
        switch (op){
            case "+":
                return evalulateHelper(eval, start, end-2) + 
                evalulateHelper(eval, end, end);
            case "-":
                return evalulateHelper(eval, start, end-2) - 
                evalulateHelper(eval, end, end);
            case "/":
                return evalulateHelper(eval, start, end-2) / 
                evalulateHelper(eval, end, end);
            default:
                return evalulateHelper(eval, start, end-2) * 
                evalulateHelper(eval, end, end);  
        }
    } 
}

/**
 * Takes the value of the screen pushes it to statement.
 * Then pushes the operator to statement.
 * Clears the screen. It will then display the current answer
 * answer of the income statement. If answer is infinity thats because
 * someone divided by zero. Then a error message will be display.
 * When the user clicks on an operator. Inprogress will be set to true
 * which means it is looking for more user input.
 * @param {String} operator 
 */
function operate(operator){
    addToStatement(getNumberFromScreen());
    addToStatement(operator);
    clearScreen();
    let currentAnswer = evalulateHelper(statement, 0, statement.length-2);
    if(currentAnswer == Infinity){
        clean();
        addToScreen(errorMessage);
        return;
    }
    addToScreen(currentAnswer);
    inprogress = true;
}

decimal.addEventListener("click", () => {
    addToScreen(".");
})

addition.addEventListener("click", () => {
    if(inprogress){
        clean();
        return;
    }
    operate("+");
})

subtraction.addEventListener("click", () => {
    if(inprogress){
        clean();
        return;
    }
    operate("-");
});

multiplication.addEventListener("click", () => {
    if(inprogress){
        clean();
        return;
    }
    operate("*");
});

division.addEventListener("click", () => {
    if(inprogress){
        clean();
        return;
    }
    operate("/");
});

clearButton.addEventListener("click", () => {
    clean();
    clearScreen();
    inprogress = false;
})

zeroButton.addEventListener("click", () => {
    addToScreen("0");
});

oneButton.addEventListener("click", () => {
    addToScreen("1");
});

twoButton.addEventListener("click", () => {
    addToScreen("2");
});

threeButton.addEventListener("click", () => {
    addToScreen("3");
});

fourButton.addEventListener("click", () => {
    addToScreen("4");
});

fiveButton.addEventListener("click", () => {
    addToScreen("5");
});

sixButton.addEventListener("click", () => {
    addToScreen("6");
});

sevenButton.addEventListener("click", () => {
    addToScreen("7");
});

eightButton.addEventListener("click", () => {
    addToScreen("8");
});

nineButton.addEventListener("click", () => {
    addToScreen("9");
});

/**
 * 
 * @param {String} content 
 */
function addToScreen(content){
    if(calculatorScreen.value == errorMessage){
        return;
    }
    if(inprogress){
        clearScreen();
        inprogress = false;
    }
    calculatorScreen.value = calculatorScreen.value + content;
}

/**
 * Clears calculator screen. 
 */
function clearScreen(){
    calculatorScreen.value = "";
}

/**
 * Removes all data in memory.
 */
function clean(){
    inprogress = false;
    statement = [];
}

/**
 * Returns integer or float number.
 */
function getNumberFromScreen(){
    return parseFloat(calculatorScreen.value);
}