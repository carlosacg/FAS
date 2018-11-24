//ESQUEMA DE MONGO PARA EL ENVIO DE DATOS ANGULAR-MYSQL
const mongoose = require('mongoose');
const {Schema} = mongoose;

const AccountSchema=new Schema({
    account_number: {type:String, required:true},
    type_account:{type:String,required:true},
    positive_balance:{type:Number,required:false},
    negative_balance:{type:String,required:false},
    description:{type:String,required:true},
    bank_name:{type:String,required:false},
    identification:{type:String,required:true}
})

module.exports=mongoose.model('Account',AccountSchema);