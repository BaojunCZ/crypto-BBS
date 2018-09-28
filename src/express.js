let express = require('express');
let app = express();
let path = require('path')

app.all('*', function (req, res, next) {
    res.set({
        'Access-Control-Allow-origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'GET'
    });
    next();
});

app.use(express.static(path.join(__dirname,'build')));

app.listen(3030);