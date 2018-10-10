//CLASE CONTROLADORA QUE ACCEDE A LA BASE DE DATOS
const User = require('../models/user');
const userController={};

userController.getUsers=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM users;',(err,users)=>{
            if(err){
                res.json(err);
            }
            res.json(users);
           
        })
    })

};

userController.getEspecifyUser=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM users WHERE identification="+req.params.id+";",(err,users)=>{
            if(err){
                res.json(err);
            }
            res.json(users);
           
        })
    })
};


userController.createUser=(req,res)=>{//LISTA LOS DATOS
    const user = new User(req.body);
    console.log(user);
    res.json('recibido');
    
    req.getConnection((err,conn)=>{
        let instrucQuery="INSERT INTO users VALUES (DEFAULT,'"+user.user_name+"','"+user.last_name+"','"+user.email+"','"+user.pass+"','"+user.picture+"');";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,users)=>{
            console.log(users);
        })
    })
};

userController.updateUser=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newUser = req.body;
    console.log(newUser);
    req.getConnection((err,conn)=>{
        let instrucQuery="UPDATE users SET user_name='"+newUser.user_name+"', last_name='"+newUser.last_name+"', email='"+newUser.email+"', pass='"+newUser.pass+"', picture='"+newUser.picture+"' WHERE identification ="+id+";";
        console.log(instrucQuery);
        conn.query(instrucQuery,(err,conn)=>{
            res.json('Empleado actualizado');

        })
    })
};

userController.deleteUser=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(req.params.id);

    req.getConnection((err,conn)=>{
        let instrucQuery="DELETE FROM users WHERE identification="+id+";";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,users)=>{
            res.redirect('/');
        })
    })
};

module.exports = userController;