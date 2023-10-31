document.addEventListener('DOMContentLoaded', function() {
    // Define constants for the GitHub repository details.
    const repoOwner = 'phairo-enterprises';
    const repoName = 'overworld-radio';

    // Use GitHub's API to fetch a list of all the files within the specified repository.
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/main?recursive=1`)
        .then(response => response.json())
        .then(data => {
            // Filter out only the Markdown files from the fetched list.
            const mdFiles = data.tree.filter(item => item.path.endsWith('.md')).map(item => item.path);
            
            const mdFilesListDiv = document.getElementById('MD-files-list');

            // For each Markdown file, create a link that, when clicked, loads and renders the file.
            mdFiles.forEach(file => {
                const fileLink = document.createElement('a');
                fileLink.href = '#';  // This ensures the browser doesn't navigate away when the link is clicked.
                fileLink.innerText = file;
                fileLink.addEventListener('click', function(event) {
                    event.preventDefault();  // Prevent the default action associated with clicking a link.
                    showMDContent(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${file}`);
                });
                mdFilesListDiv.appendChild(fileLink);

                // Add a title link that allows toggling the MD file list.
                const titleLink = document.createElement('a');
                titleLink.href = '#';
                titleLink.innerText = file; // Display the MD file name as the title.
                titleLink.addEventListener('click', toggleMDList);
                document.body.appendChild(titleLink); // Append the title link to the body.

                // Improve readability by separating each file link with a line break.
                mdFilesListDiv.appendChild(document.createElement('br'));
            });
        })
        .catch(error => {
            // Handle potential errors in fetching the file list.
            logToConsole(`Error fetching MD files: ${error.message}`, "error");
        });
});
