function setEnhancedTitle() {
    const repoOwner = 'phairo-enterprises';
    const repoName = 'overworld-radio';
    const readmeUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/README.md`;

    // Fetch the README.md content
    fetch(readmeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch README.md");
            }
            return response.text();
        })
        .then(content => {
            // Parse and extract the first header from the README.md
            const firstHeader = content.match(/^#\s(.+)$/m);
            const title = firstHeader ? firstHeader[1] : "no-readme";

            // Update the enhanced mode title with the extracted title
            document.getElementById('enhanced-title').innerText = title;
        })
        .catch(error => {
            // In case of any error, set the title to "no-readme"
            document.getElementById('enhanced-title').innerText = "no-readme";
            logToConsole(`Error setting enhanced title from README.md: ${error.message}`, "error");
        });
}
