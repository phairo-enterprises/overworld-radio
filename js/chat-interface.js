// chat-interface.js

function showChatInterface() {
    document.getElementById('chatGPTInterface').style.display = 'block';
    document.getElementById('userQuery').focus();
}

function hideChatInterface() {
    document.getElementById('chatGPTInterface').style.display = 'none';
}

function displayResponse(response) {
    const responseElement = document.getElementById('chatGPTResponse');
    responseElement.innerText = response;
    responseElement.style.display = 'block';
}

function clearChatFields() {
    document.getElementById('userQuery').value = '';
    document.getElementById('chatGPTResponse').innerText = '';
}

// New Function: Handle user query submission
function handleQuerySubmission() {
    const userInput = document.getElementById('userQuery').value;
    clearChatFields();
    // Placeholder for calling API function
    // fetchChatGPTResponse(userInput).then(displayResponse);
}

// New Function: Update interface for loading state
function setLoadingState(isLoading) {
    const loadingIndicator = document.getElementById('loadingIndicator'); // Assume an element with this ID exists
    if (isLoading) {
        loadingIndicator.style.display = 'block';
    } else {
        loadingIndicator.style.display = 'none';
    }
}

// More functions can be added as needed
