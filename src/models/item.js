//ESQUEMA DE MONGO PARA EL ENVIO DE DATOS ANGULAR-MYSQL
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ItemSchema=new Schema({
    item_number:{type:String,required:true},
    budget_number: {type:String, required:true},
    planned_balance:{type:Number,required:true},
    spent_balance:{type:String,required:true},
    description:{type:String,required:true}
})

module.exports=mongoose.model('Item',ItemSchema);