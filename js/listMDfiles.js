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
                    loadMDfile(file);  // Use the loadMDfile function
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
