// Function to load and display the content of a given Markdown file
function loadMDfile(filename) {
    // Log to the console
    logToConsole(`Attempting to load ${filename}...`);

    // Fetch the content of the file
    fetch(filename)
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

            //
