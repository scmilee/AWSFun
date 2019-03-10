import 'babel-polyfill'
const express = require('express');
const app = express();
import QueueReader from'./lib/QueueReader'

const qr= new QueueReader()
qr.listenForPlays();
app.listen(3030, () => console.log('Express Server Now listening for SQS messages'));