//CLASE CONTROLADORA QUE ACCEDE A LA BASE DE DATOS
const Account = require('../models/account');
const accountController={};

accountController.getAccounts=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM account;',(err,accounts)=>{
            if(err){
                res.json(err);
            }
            res.json(accounts);
           
        })
    })

};

accountController.getEspecifyAccount=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM account WHERE account_number="+req.params.id+";",(err,accounts)=>{
            if(err){
                res.json(err);
            }
            res.json(accounts);
           
        })
    })
};


accountController.createAccount=(req,res)=>{//LISTA LOS DATOS
    console.log(req.body);
    const account = new Account(req.body);
    console.log(account);
    res.json('recibido');
    

    req.getConnection((err,conn)=>{
        let instrucQuery="INSERT INTO account VALUES (DEFAULT,'"+account.type_account+"',"+account.positive_balance+","+account.negative_balance+",'"+account.description+"','"+account.bank_name+"',"+account.identification+");";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,account)=>{
            console.log(account);
        })
    })
};

accountController.updateAccount=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newAccount = req.body;
    console.log(newAccount);
    req.getConnection((err,conn)=>{
        let instrucQuery="UPDATE account SET type_account='"+newAccount.type_account+"', positive_balance="+newAccount.positive_balance+", negative_balance="+newAccount.negative_balance+", description='"+newAccount.description+"', bank_name='"+newAccount.bank_name+"', identification="+newAccount.identification+" WHERE account_number ="+id+";";
        console.log(instrucQuery);
        conn.query(instrucQuery,(err,conn)=>{
            res.json('Cuenta actualizado');

        })
    })
};

accountController.insertIncome=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newAccount = req.body;
    console.log(newAccount);
    
    req.getConnection((err,conn)=>{
        let instrucQuery="UPDATE account SET positive_balance="+newAccount.positive_balance+" WHERE account_number ="+id+";";
        console.log(instrucQuery);
        conn.query(instrucQuery,(err,conn)=>{
            res.json('Cuenta actualizado');
        })
    })
};

accountController.deleteAccount=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(req.params.id);

    req.getConnection((err,conn)=>{
        let instrucQuery="DELETE FROM account WHERE account_number="+id+";";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,users)=>{
            res.redirect('/');
        })
    })
};

module.exports = accountController;