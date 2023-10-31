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

            // Display the rendered content in the contentArea div
            document.getElementById('contentArea').innerHTML = renderedHTML;

            // Log success to the console
            logToConsole(`${filename} loaded and rendered successfully.`);
        })
        .catch(error => {
            // Log any errors to the console
            logToConsole(`Failed to load ${filename}. Error: ${error.message}`);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    // Define the repository and owner
    const repoOwner = 'phairo-enterprises';
    const repoName = 'overworld-radio';

    // Fetch the list of files from the repository using GitHub API
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/main?recursive=1`)
        .then(response => response.json())
        .then(data => {
            const mdFiles = data.tree.filter(item => item.path.endsWith('.md')).map(item => item.path);
            
            const mdFilesListDiv = document.getElementById('MD-files-list');

            mdFiles.forEach(file => {
                const fileLink = document.createElement('a');
                fileLink.href = '#';  // Prevent default navigation
                fileLink.innerText = file;
                fileLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    loadMDfile(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${file}`);  // Use the loadMDfile function
                });
                mdFilesListDiv.appendChild(fileLink);

                // Add a line break for clarity
                mdFilesListDiv.appendChild(document.createElement('br'));
            });
        })
        .catch(error => {
            console.error("Error fetching MD files:", error);
        });
});
