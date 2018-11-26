const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
//IMPORTING ROUTES



//SETTINGS
app.set('port', process.env.PORT || 3000);


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//Static files
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/dist/pruebaAngular'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/pruebaAngular/index.html'));
});


//STARTING THE SERVER
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'));
})









