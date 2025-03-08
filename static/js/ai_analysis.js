// ... existing code ...
async function analyzeFood() {
    try {
        const response = await fetch('/analyze', {  // Using relative path for same-domain deployment
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: base64Image,
                timestamp: new Date().getTime()
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // ... existing code ...
    } catch (error) {
        console.error('Error during analysis:', error);
        // Handle error appropriately
    }
}
// ... existing code ...