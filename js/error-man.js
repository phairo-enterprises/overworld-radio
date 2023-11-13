// error-man.js

function displayError(error) {
    const consoleDiv = document.getElementById('consoleDisplay');
    consoleDiv.style.display = 'block';
    consoleDiv.innerText = 'Error: ' + error;
}

function clearConsole() {
    const consoleDiv = document.getElementById('consoleDisplay');
    consoleDiv.style.display = 'none';
    consoleDiv.innerText = '';
}

// Additional error handling functions can be added as needed
