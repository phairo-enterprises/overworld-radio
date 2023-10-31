// This function fetches, converts, and renders a specified Markdown file.
function loadMDfile(filename) {
    // Inform the user that the loading process has started.
    logToConsole(`Attempting to load ${filename}...`);

    // Fetch the content of the provided file.
    fetch(filename)
        .then(response => {
            // Handle non-successful HTTP responses.
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            // Convert the fetched Markdown content into HTML using the 'marked' library.
            const renderedHTML = marked(content);

            // Display the converted HTML content in the designated content area.
            document.getElementById('contentArea').innerHTML = renderedHTML;

            // Update the user about the successful rendering of the file.
            logToConsole(`${filename} loaded and rendered successfully.`);
        })
        .catch(error => {
            // In case of any errors, inform the user with the specific error message.
            logToConsole(`Failed to load ${filename}. Error: ${error.message}`, "error");
        });
}
