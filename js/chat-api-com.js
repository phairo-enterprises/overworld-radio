// chat-api-communication.js

async function fetchChatGPTResponse(userInput) {
    try {
        setLoadingState(true); // Indicate loading state

        const response = await fetch('https://api.yourchatgptendpoint.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' // Replace with actual API key
            },
            body: JSON.stringify({ query: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.reply; // Assuming the response contains a 'reply' key
    } catch (error) {
        displayError(error.message); // Display error in the UI
        return 'Sorry, there was an error processing your request.'; // Fallback message
    } finally {
        setLoadingState(false); // Reset loading state
    }
}
