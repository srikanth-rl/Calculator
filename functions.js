let output = document.getElementById("output-screen");

function Calculate() {
    try {
        output.value = eval(output.value);
    } catch (err) { alert("Invalid input") }
    // Clear();
}

function display(num) {
    output.value += num;
}

function Clear() {
    output.value = "";
}

function Delete() {
    output.value = output.value.slice(0, -1);
}
