const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Replace these with your actual Twilio credentials
const accountSid = 'ACd6bd80880d5787228d28ea7ccb7a18e9'; // Your Twilio Account SID
const authToken = 'e0e11d8d2772ba7fb0840ec52f008d1a'; // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-message', (req, res) => {
    const message = req.body.message;
    const to = req.body.to;

    if (!message || !to) {
        return res.status(400).send('Message and To parameters are required.');
    }

    // Log the phone number and message for debugging
    console.log(`Sending message to: ${to}`);
    console.log(`Message content: ${message}`);

    client.messages.create({
        body: message,
        from: '+12564877846', // Replace with your Twilio phone number
        to: to
    })
    .then((message) => {
        res.send(`Message sent! SID: ${message.sid}`);
    })
    .catch((error) => {
        console.error('Twilio error:', error);
        res.status(500).send(`Error: ${error.message}`);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
