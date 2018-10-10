//ESQUEMA DE MONGO PARA EL ENVIO DE DATOS ANGULAR-MYSQL
const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema=new Schema({
    identification: {type:String, required:true},
    user_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true},
    picture:{type:String,required:false}
})

module.exports=mongoose.model('User',UserSchema);