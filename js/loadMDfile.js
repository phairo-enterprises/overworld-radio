// Function responsible for fetching, converting, and rendering a specified Markdown file.
function loadMDfile(filename) {
    // Log the action for user awareness.
    logToConsole(`Attempting to load ${filename}...`);

    // Fetch the content of the specified file.
    fetch(filename)
        .then(response => {
            // If the fetch wasn't successful, throw an error to be caught later.
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            // Use the 'marked' library to convert the fetched Markdown content into HTML.
            const renderedHTML = marked(content);

            // Inject the converted content into the designated area on the webpage.
            document.getElementById('contentArea').innerHTML = renderedHTML;

            // Inform the user of the successful rendering.
            logToConsole(`${filename} loaded and rendered successfully.`);
        })
        .catch(error => {
            // Log and inform the user of any encountered errors.
            logToConsole(`Failed to load ${filename}. Error: ${error.message}`, "error");
        });
}
