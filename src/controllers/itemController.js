//CLASE CONTROLADORA QUE ACCEDE A LA BASE DE DATOS
const Item = require('../models/item');
const itemController={};

itemController.getItems=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM item;',(err,items)=>{
            if(err){
                res.json(err);
            }
            res.json(items);
           
        })
    })

};

itemController.getEspecifyItem=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM item WHERE item_number="+req.params.id+";",(err,items)=>{
            if(err){
                res.json(err);
            }
            res.json(items);
           
        })
    })
};


itemController.createItem=(req,res)=>{//LISTA LOS DATOS
    console.log(req.body);
    const item = new Item(req.body);
    console.log(item);
    res.json('recibido');
    

    req.getConnection((err,conn)=>{
        let instrucQuery="INSERT INTO item VALUES (DEFAULT,"+item.budget_number+","+item.planned_balance+","+item.spent_balance+",'"+item.description+"');";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,item)=>{
            console.log(item);
        })
    })
};

itemController.updateItem=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newItem = req.body;
    console.log(newItem);
    req.getConnection((err,conn)=>{
        let instrucQuery="UPDATE item SET budget_number="+newItem.budget_number+", planned_balance="+newItem.planned_balance+", spent_balance="+newItem.spent_balance+", description='"+newItem.description+"' WHERE item_number ="+id+";";
        console.log(instrucQuery);
        conn.query(instrucQuery,(err,conn)=>{
            res.json('Cuenta actualizado');

        })
    })
};

itemController.deleteItem=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(req.params.id);

    req.getConnection((err,conn)=>{
        let instrucQuery="DELETE FROM item WHERE item_number="+id+";";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,item)=>{
            res.redirect('/');
        })
    })
};

module.exports = itemController;