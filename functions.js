let output = document.getElementById("output-screen");
let history = [];

function Calculate() {
    try {
        let expression = output.value.replace(/%/g, '/100');
        let result = eval(expression);
        history.push({ expression: output.value, result });
        output.value = result;
    } catch (err) {
        alert("Invalid input");
    }
    document.addEventListener("keydown", function(event) {
        const cursorPos = output.selectionStart;

        switch (event.key) {
            case 'ArrowLeft':
                output.setSelectionRange(cursorPos - 1, cursorPos - 1);
                break;
            case 'ArrowRight':
                output.setSelectionRange(cursorPos + 1, cursorPos + 1);
                break;
        }
        event.preventDefault();
    });
}

function toggleNotes() {
    const notesList = document.getElementById('notes');
    if (notesList.style.display === 'none' || notesList.style.display === '') {
        notesList.style.display = 'block';
    } else {
        notesList.style.display = 'none';
    }
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const darkModeButton = document.querySelector('.toggle-mode.dark-mode');
    if (darkModeButton) {
        if (body.classList.contains('dark-mode')) {
            darkModeButton.textContent = 'Light Mode';
        } else {
            darkModeButton.textContent = 'Dark Mode';
        }
     } else {
        console.error('Dark mode button not found');
     }
}
function calculateMod() {
    output.value = ''; 
    try {
        let num1 = BigInt(prompt("To calculate Remainder:\nEnter the first value:")); 
        let num2 = BigInt(prompt("Enter the second value:"));
        
        if (typeof num1 !== 'bigint' || typeof num2 !== 'bigint') {
            throw new Error("Invalid input. Please enter valid numbers.");
        }

        let result = (((num1 % num2)+num2)%num2).toString(); 
        output.value = `${num1} mod ${num2} = ${result}`; 
        history.push({ expression: `${num1} mod ${num2}`, result }); 
        document.addEventListener('keydown', clearOutputOnKeyPress);
      } catch (error) {
	alert("Invalid input. Please enter a valid number.");
        output.value = '';
	return;
      }
}

function clearOutputOnKeyPress(event) {
    if (event.key !== "Enter") {
        output.value = '';
        document.removeEventListener('keydown', clearOutputOnKeyPress);
    }
}

// Function to check if a number is prime (naive approach)
function isPrimeNaive(num) {
    if (num <= 1n) return false;
    if (num <= 3n) return true;
    if (num % 2n === 0n || num % 3n === 0n) return false;

    let i = 5n;
    while (i * i <= num) {
        if (num % i === 0n || num % (i + 2n) === 0n) return false;
        i += 6n;
    }
    return true;
}

function isPrime(num) {
    num = BigInt(num);
    return isPrimeNaive(num);
}

function checkPrime() {
    let userInput = prompt("Enter the value (up to 17 digits) to check for prime number:\n");
    if (userInput === null || userInput.trim() === "") {
    	alert("Invalid input. Please enter a valid number.");
    	return;
    }
    userInput = userInput.replace(/,/g, "").trim();
    let num;
    try {
    	num = BigInt(userInput);
    	if (num.toString().length > 17) {
        	alert("Input value is big.\nPlease enter a value with up to 17 digits.");
        	return;
    	}
    
    } catch (error) {
    	alert("Invalid input. Please enter a valid number.");
    	return;
    }
    if (num <= 1n) {
        alert("Invalid input. Please enter a positive number greater than 1.");
        return;
    }

    let isNumPrime = isPrime(num) ? "Prime number." : "Not a Prime number.";
    let resultMessage;
    if (isNumPrime === "Prime number.") {
    	resultMessage = `${num} is a prime number.`;
    } else {
    	resultMessage = `${num} is not a prime number.`;
    }
    alert(resultMessage);
  history.push({ expression: `(${num})`, result: isNumPrime });
}


function calculateFactorial() {
    const x = BigInt(output.value);
    if (x.toString().length > 5) {
        alert("Input value is big. Please enter a value with up to 5 digits.");
        return;
    }
    let result = BigInt(1);
    for (let i = 2n; i <= x; i++)
        result *= i;
    output.value = `${x}! = ${result.toString()}`;
    output.disabled = true;
    const expression = `${x}!`;
    const resultString = result.toString();
    const lengthOfResult = "\n"+resultString.length;
    const historyItem = { expression: expression, result:`${resultString}. Length of ${expression} = ${lengthOfResult} digits`}

    history.push(historyItem);
}

function display(input) {
    output.value += input;
}

function Delete() {
    const cursorPos = output.selectionStart;
    output.value = output.value.slice(0, cursorPos - 1) + output.value.slice(cursorPos);
    output.setSelectionRange(cursorPos - 1, cursorPos - 1);
}

function Clear() {
    output.value = "";
    output.disabled = false;
    output.focus();
}

document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key !== 'Backspace' && event.key !== '-'&& event.key !== '+'&&event.key === 'r' && event.key.toLowerCase() !== 'f' && event.key.toLowerCase() !== 'h') {
            return;
        }
        if (output.disabled && !event.ctrlKey) {
        event.preventDefault();
    }
     else if (
        (event.key >= '0' && event.key <= '9') || ['+', '-', '*', '/', '%'].includes(event.key) ||
        event.key === 'Enter' ||
        event.key.toLowerCase() === 'f' ||
        (event.key === 'Backspace' && !event.ctrlKey)
    ) {
        if (event.key === 'Enter') {
            Calculate();
        } else if (event.key.toLowerCase() === 'f') {
            calculateFactorial();
        } else if (event.key === 'Backspace') {
            const cursorPos = output.selectionStart;
            if (cursorPos > 0) {
                output.value = output.value.slice(0, cursorPos - 1) + output.value.slice(cursorPos);
                output.setSelectionRange(cursorPos - 1, cursorPos - 1);
            }
        } else {
            const cursorPos = output.selectionStart;
            output.value = output.value.slice(0, cursorPos) + event.key + output.value.slice(cursorPos);
            output.setSelectionRange(cursorPos + 1, cursorPos + 1);
        }
    } else if (event.key === 'Backspace' && event.ctrlKey) {
        Clear();
    }

    event.preventDefault();
});

function displayHistory() {
    const historyBar = document.getElementById("history-bar");
    historyBar.classList.toggle("visible");
    if (historyBar.classList.contains("visible")) {
        historyBar.innerHTML = "";
        for (let entry of history) {
            let historyEntry = document.createElement("div");
            historyEntry.textContent = `${entry.expression} = ${entry.result}`;
            historyBar.appendChild(historyEntry);
        }        
        historyBar.scrollTop = historyBar.scrollHeight;
    }
    
}

document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === 'h') {
        displayHistory();
    }
});


function clearHistory() {
    history = [];
    displayHistory();
}

function clock() {
    let dt = new Date(),
        hr = dt.getHours(),
        min = dt.getMinutes(),
        sec = dt.getSeconds(),
        day = dt.toLocaleDateString('en-US', { weekday: 'long' }),
        month = dt.toLocaleDateString('en-US', { month: 'long' }),
        date = dt.getDate();
    if (hr > 12) {
        hr -= 12;
        document.getElementById('ampm').innerHTML = "PM";
    } else {
        document.getElementById('ampm').innerHTML = "AM";
    }
    document.getElementById('hrs').innerHTML = addZero(hr);
    document.getElementById('min').innerHTML = addZero(min);
    document.getElementById('sec').innerHTML = addZero(sec);

    document.getElementById('day').innerHTML = day;
    document.getElementById('month').innerHTML = month;
    document.getElementById('date').innerHTML = date;
}

setInterval(clock, 1000);

function addZero(no) {
    return no < 10 ? "0" + no : no;
}
