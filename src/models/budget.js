//ESQUEMA DE MONGO PARA EL ENVIO DE DATOS ANGULAR-MYSQL
const mongoose = require('mongoose');
const {Schema} = mongoose;

const BudgetSchema=new Schema({
    budget_number: {type:String, required:true},
    budget_name:{type:String,required:true},
    initial_date:{type:String,required:true},
    end_date:{type:String,required:true},
    identification:{type:String,required:true}
})

module.exports=mongoose.model('Budget',BudgetSchema);