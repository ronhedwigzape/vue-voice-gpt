import { test } from 'vitest'
import request from 'supertest'
import nock from 'nock'
import mockFs from 'mock-fs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Mock the file system
mockFs({
    '../public/voice': {}
})

// Mock the OpenAI API
nock('https://api.openai.com')
    .post('/v1/engines/davinci-codex/completions')
    .reply(200, {
        id: 'cmpl-4y8F8ZTR3Y6XxlIcVgaZ4t4BbPbU',
        object: 'text.completion',
        created: 1627908206,
        model: 'text-davinci-003',
        choices: [
            {
                text: 'Hello, world!',
                finish_reason: 'stop',
                index: 0
            }
        ]
    })

// Mock the AWS Polly API
nock('https://polly.amazonaws.com')
    .post('/v1/speech')
    .reply(200, {
        // Mocked response
        AudioStream: Buffer.from('Hello, world!', 'utf-8')
    })

app.post('/api/text-to-audio-file', async (req, res) => {

})

test('POST /api/text-to-audio-file should respond with a status code of 200', ({ expect }) => {
    request(app)
        .post('/api/text-to-audio-file')
        .send({ text: 'Hello, world!' })
        .end((err, res) => {
            if (err) throw err;
            expect(res.statusCode).toEqual(200)
            // Check that the response body contains the expected data
            expect(res.body).toEqual(expect.any(Number))
        })
})


// Restore the file system after all tests
test('cleanup', () => {
    mockFs.restore()
})
