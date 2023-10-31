// This function fetches, converts, and renders a specified Markdown file.
function loadMDfile(filename) {
    console.log('loadMDfile function called with filename:', filename);

    // Inform the user that the loading process has started.
    logToConsole(`Attempting to load ${filename}...`);

    // Fetch the content of the provided file.
    fetch(filename)
        .then(response => {
            console.log('Fetch response received:', response);
            // Handle non-successful HTTP responses.
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            console.log('Fetched content:', content.substring(0, 100) + "...");  // Log the first 100 chars for brevity
            // Convert the fetched Markdown content into HTML using the 'marked' library.
            const renderedHTML = marked(content);

            // Display the converted HTML content in the designated content area.
            document.getElementById('contentArea').innerHTML = renderedHTML;

            // Update the user about the successful rendering of the file.
            logToConsole(`${filename} loaded and rendered successfully.`);
        })
        .catch(error => {
            console.error('Error in loadMDfile:', error);
            // In case of any errors, inform the user with the specific error message.
            logToConsole(`Failed to load ${filename}. Error: ${error.message}`, "error");
        });
}
