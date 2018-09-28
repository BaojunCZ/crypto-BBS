let express = require('express');
let app = express();

app.all('*', function (req, res, next) {
    res.set({
        'Access-Control-Allow-origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'GET'
    });
    next();
});

app.use(express.static('build'));

app.get('*', function (req, res) {
    res.sendFile('/build/index.html');
});

app.listen(3030);