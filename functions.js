let output = document.getElementById("output-screen");

function Calculate() {
    try {
        output.value = eval(output.value);
    } catch (err) {
        alert("Invalid input");
    }
}

function display(num) {
    output.value += num;
}

function Delete() {
    const cursorPos = output.selectionStart;
    output.value = output.value.slice(0, cursorPos - 1) + output.value.slice(cursorPos);
    output.setSelectionRange(cursorPos - 1, cursorPos - 1); // Set the cursor position after deletion
}


function factorial(no) {
    if (no <= 1n) return 1n;
    return no * factorial(no - 1n);
}

function calculateFactorial() {
    const x = BigInt(output.value);
    output.value += `\n${factorial(x)}`;
}

document.addEventListener("keydown", function (event) {
    // Check if the pressed key is a number (0-9), an arithmetic operator, the Enter key, the factorial key, or the Backspace key
 if (
        (event.key >= '0' && event.key <= '9') ||
        ['+', '-', '*', '/', '%'].includes(event.key) ||
        event.key === 'Enter' ||
        event.key.toLowerCase() === 'f' ||
        event.key === 'Backspace'
    ) {
        event.preventDefault(); // Prevent default action for these keys (e.g., submitting a form)

        if (event.key === 'Enter') {
            Calculate();
        } else if (event.key.toLowerCase() === 'f') {
            calculateFactorial();
        } else if (event.key === 'Backspace') {
            const cursorPos = output.selectionStart;
            if (cursorPos > 0) {
                output.value = output.value.slice(0, cursorPos - 1) + output.value.slice(cursorPos);
                output.setSelectionRange(cursorPos - 1, cursorPos - 1); // Set the cursor position after deletion
            }
        } else {
            const cursorPos = output.selectionStart;
            output.value = output.value.slice(0, cursorPos) + event.key + output.value.slice(cursorPos);
            output.setSelectionRange(cursorPos + 1, cursorPos + 1); // Set the cursor position after adding the new character
        }
    }
});
clock = () => {
    let dt = new Date(),
        hr = dt.getHours(),
        min = dt.getMinutes(),
        sec = dt.getSeconds();
    if (hr > 12) {
        hr -= 12;
        document.getElementById('ampm').innerHTML = "PM";
    } else {
        document.getElementById('ampm').innerHTML = "AM";
    }
    document.getElementById('hrs').innerHTML = addZero(hr);
    document.getElementById('min').innerHTML = addZero(min);
    document.getElementById('sec').innerHTML = addZero(sec);
};

setInterval(clock, 1000);

addZero = (no) => {
    return no < 10 ? "0" + no : no;
};
