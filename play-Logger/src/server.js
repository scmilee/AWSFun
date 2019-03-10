import 'babel-polyfill'
const express = require('express');
const app = express();
import QueueReader from'./lib/QueueReader'

const qr= new QueueReader()
try {
    qr.listenForPlays();
} catch (error) {
    console.log(error)
}

app.listen(3030, () => console.log('Express Server Now listening for SQS messages'));