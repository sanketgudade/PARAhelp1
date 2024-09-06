const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Replace these with your Twilio credentials
const accountSid = 'ACd6bd80880d5787228d28ea7ccb7a18e9'; // Ensure this starts with 'AC'
const authToken = 'e0e11d8d2772ba7fb0840ec52f008d1a'; // Ensure this is your valid Auth Token
const twilioPhoneNumber = '+12564877846'; // Your Twilio phone number
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-message', (req, res) => {
    const { message, to } = req.body;
    
    console.log(`Sending message: "${message}" to ${to}`);

    client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: to
    })
    .then(message => {
        console.log(`Message sent: ${message.sid}`);
        res.status(200).send(`Message sent: ${message.sid}`);
    })
    .catch(error => {
        console.error(`Error: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
