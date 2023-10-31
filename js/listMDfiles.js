document.addEventListener('DOMContentLoaded', function() {
    // Constants for the GitHub repository details.
    const repoOwner = 'phairo-enterprises';
    const repoName = 'overworld-radio';

    // Fetch a list of all files within the specified GitHub repository.
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/main?recursive=1`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API returned status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Filter to get only the Markdown files from the fetched list.
            const mdFiles = data.tree.filter(item => item.path.endsWith('.md')).map(item => item.path);

            const mdFilesListDiv = document.getElementById('MD-files-list');

            // Render each Markdown file as a link. Clicking on the link will display its content.
            mdFiles.forEach(file => {
                const fileLink = document.createElement('a');
                fileLink.href = '#';
                fileLink.innerText = file;
                fileLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    showMDContent(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${file}`);
                });
                mdFilesListDiv.appendChild(fileLink);

                // Add a line break for visual separation of file links.
                mdFilesListDiv.appendChild(document.createElement('br'));
            });
        })
        .catch(error => {
            // Log errors to the console output.
            logToConsole(`Error fetching MD files: ${error.message}`);
        });
});

