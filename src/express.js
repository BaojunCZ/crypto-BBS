let express = require('express');
let app = express();
const history = require('connect-history-api-fallback');

app.all('*', function (req, res, next) {
    res.set({
        'Access-Control-Allow-origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'GET'
    });
    next();
});

app.use(history());
app.use(express.static('build'));
// app.use(express.static(path.join(__dirname, '../build')))

app.listen(3030);