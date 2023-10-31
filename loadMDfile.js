// Function to load and display the content of a hardcoded Markdown file
function loadMDfile() {
    const hardcodedFilename = 'https://raw.githubusercontent.com/phairo-enterprises/overworld-radio/main/README.md'; // replace with a known path
    
    // Log to the console
    logToConsole(`Attempting to load ${hardcodedFilename}...`);

    // Fetch the content of the file
    fetch(hardcodedFilename)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            // Convert the Markdown content to HTML using marked.js
            const renderedHTML = marked(content);

            // Display the rendered content in the contentArea div
            document.getElementById('contentArea').innerHTML = renderedHTML;

            // Log success to the console
            logToConsole(`${hardcodedFilename} loaded and rendered successfully.`);
        })
        .catch(error => {
            // Log any errors to the console
            logToConsole(`Failed to load ${hardcodedFilename}. Error: ${error.message}`);
        });
}

// Call the function directly upon page load
document.addEventListener('DOMContentLoaded', loadMDFile);
