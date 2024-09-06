function sendMessageToMobile(message) {
    
    const url = 'https://your-server.com/send_sms';

    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent successfully:', data);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
}
