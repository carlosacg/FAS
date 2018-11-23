const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');
//IMPORTING ROUTES
const passwordDataBase='k4HDdT9v4T';


const userRoutes=require('./routes/user');
const accountRoutes=require('./routes/account');
const transactionRoutes=require('./routes/transaction');
const budgetRoutes=require('./routes/budget');
const itemRoutes=require('./routes/item');


//SETTINGS
app.set('port', process.env.PORT || 3000);


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'})); //PERMITE COMUNICACION CON ANGULAR

app.use(myConnection(mysql,{ //CONEXION A LA BASE DE DATOS
    host: 'db4free.net',
    user:'un1v4ll3',
    password: 'un1v4ll3',
    port: 3306,
    database: 'fas_db'
},'single'));

app.use(express.urlencoded({extended:false}));


//ROUTES
app.use('/api/users', userRoutes);  //PERMITE USAR LAS RUTAS DE LOS USUARIOS
app.use('/api/accounts', accountRoutes);  //PERMITE USAR LAS RUTAS DE LAS CUENTAS
app.use('/api/transactions', transactionRoutes);  //PERMITE USAR LAS RUTAS DE LAS TRANSACCIONES
app.use('/api/budgets', budgetRoutes);  //PERMITE USAR LAS RUTAS DE LOS PRESUPUESTOS
app.use('/api/items', itemRoutes);  //PERMITE USAR LAS RUTAS DE LOS ITEMS


//Static files
app.use(express.static(path.join(__dirname,'public')));


//STARTING THE SERVER
app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000');
})
