const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/dist/pruebaAngular'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/pruebaAngular/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'));
})









