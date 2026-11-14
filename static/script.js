let expression = "";

function appendValue(val) {
    expression += val;
    updateDisplay(expression);
}

function clearDisplay() {
    expression = "";
    updateDisplay("0");
}

function updateDisplay(text) {
    document.getElementById("display").innerText = text || "0";
}

async function calculate() {
    if (!expression) return;
    try {
        const response = await fetch("/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expression })
        });
        const data = await response.json();
        if (data.error) {
            updateDisplay("Error");
            expression = "";
        } else {
            updateDisplay(data.result);
            expression = String(data.result);
        }
    } catch {
        updateDisplay("Error");
        expression = "";
    }
}