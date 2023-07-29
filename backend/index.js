const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// Import OpenAIApi
const { Configuration, OpenAIApi } = require("openai");

// Import AWS SDK
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { Polly } = require("@aws-sdk/client-polly");

const configuration = new Configuration({ apiKey: 'sk-.....'}); // replace sk-..... with your OpenAI apiKey
const openai = new OpenAIApi(configuration);
const polly = new Polly({ region: "ap-southeast-1" }); // replace ap-southeast-1 with your region
const awsCreds = require("./awsCreds.json");

const dynamoDBClient = new DynamoDBClient({
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: awsCreds.accessKeyId,
        secretAccessKey: awsCreds.secretAccessKey,
    },
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/text-to-audio-file', async (req, res) => {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        max_tokens: 100,
        temperature: 0.5
    })

    let num = (Math.random() * 100000000).toFixed(0);

    const params = {
        OutputFormat: "mp3",
        Text: completion.data.choices[0].text,
        VoiceId: "Matthew"
    }

    await polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let filePath = "../public/voice";
        let fileName = num + ".mp3";

        fs.writeFileSync(filePath + "/" + fileName, data.AudioStream);

    })

    setTimeout(() => { res.status(200).json(num) }, 4500)
})

app.listen(4001, () => {
    console.log(`Server is ready at http://localhost:4001`);
});
