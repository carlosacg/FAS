//ESQUEMA DE MONGO PARA EL ENVIO DE DATOS ANGULAR-MYSQL
const mongoose = require('mongoose');
const {Schema} = mongoose;

const TransacionSchema=new Schema({
    transaction_number: {type:String, required:true},
    item_number:{type:String,required:true},
    account_number:{type:String,required:false},
    spent_date:{type:String,required:false},
    spent_balance:{type:String,required:true},
    description:{type:String,required:true},

})

module.exports=mongoose.model('Transaction',TransacionSchema);