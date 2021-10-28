const express = require('express');
const router = require('./js/router');
const app = express();

app.use(express.json());

app.use('/api', router);

const server = app.listen(5000, () => {
    console.log('Listening at:', server.address().address + ':' + server.address().port)
})