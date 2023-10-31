/* Function to hide main UI elements, simulating a "Magic Mode" */
function activateMagicMD() {
    // Hide primary UI components
    document.getElementById('main-heading').style.display = 'none';
    document.getElementById('MD-files-list').style.display = 'none';
    document.getElementById('contentArea').style.display = 'none';
    document.getElementById('activate-magic').style.display = 'none';
    document.getElementById('md-selection-text').style.display = 'none';

    // Get the lists for non-enhanced and enhanced modes
    const mdFilesList = document.getElementById('MD-files-list');
    const enhancedBodyDiv = document.getElementById('enhanced-body');

    // Move the MD file links from non-enhanced to enhanced mode
    while (mdFilesList.firstChild) {
        enhancedBodyDiv.appendChild(mdFilesList.firstChild);
    }

    // Show debug-only button and the enhanced mode components
    document.getElementById('deactivate-magic').style.display = 'block';
    document.getElementById('enhanced-box').style.display = 'block';

    logToConsole("MagicMD activated!");
}

/* Function to reverse the changes made by activateMagicMD() */
function deactivateMagicMD() {
    // Move the MD file links back from enhanced to non-enhanced mode
    const mdFilesList = document.getElementById('MD-files-list');
    const enhancedBodyDiv = document.getElementById('enhanced-body');

    while (enhancedBodyDiv.firstChild) {
        mdFilesList.appendChild(enhancedBodyDiv.firstChild);
    }

    // Show primary UI components
    document.getElementById('main-heading').style.display = 'block';
    document.getElementById('MD-files-list').style.display = 'block';
    document.getElementById('contentArea').style.display = 'block';
    document.getElementById('activate-magic').style.display = 'block';
    document.getElementById('md-selection-text').style.display = 'block';

    // Hide debug-only button and the enhanced mode box
    document.getElementById('deactivate-magic').style.display = 'none';
    document.getElementById('enhanced-box').style.display = 'none';

    logToConsole("MagicMD deactivated!");
}
