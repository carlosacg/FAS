//CLASE CONTROLADORA QUE ACCEDE A LA BASE DE DATOS
const Transaction = require('../models/transactions');
const transactionController={};

transactionController.getTransactions=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM transactions;',(err,transactions)=>{
            if(err){
                res.json(err);
            }
            res.json(transactions);
           
        })
    })

};

transactionController.getEspecifyTransaction=(req,res)=>{//LISTA LOS DATOS
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM transactions WHERE transaction_number="+req.params.id+";",(err,transactions)=>{
            if(err){
                res.json(err);
            }
            res.json(transactions);
           
        })
    })
};


transactionController.createTransaction=(req,res)=>{//LISTA LOS DATOS
    console.log(req.body);
    const transactions = new Transaction(req.body);
    console.log(transactions);
    res.json('recibido');
    

    req.getConnection((err,conn)=>{
        let instrucQuery="INSERT INTO transactions VALUES (DEFAULT,"+transactions.item_number+","+transactions.account_number+", CURRENT_DATE"+","+transactions.spent_balance+");";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,transactions)=>{
            console.log(transactions);
        })
    })
};

transactionController.updateTransaction=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newTransaction = req.body;
    console.log(newTransaction);
    req.getConnection((err,conn)=>{
        let instrucQuery="UPDATE transactions SET item_number="+newTransaction.item_number+", account_number="+newTransaction.account_number+", spent_date='"+newTransaction.spent_date+"', spent_balance="+newTransaction.spent_balance+" WHERE transaction_number ="+id+";";
        console.log(instrucQuery);
        conn.query(instrucQuery,(err,conn)=>{
            res.json('Cuenta actualizado');

        })
    })
};


transactionController.deleteTransaction=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(req.params.id);

    req.getConnection((err,conn)=>{
        let instrucQuery="DELETE FROM transactions WHERE transaction_number="+id+";";
        console.log(instrucQuery);

        conn.query(instrucQuery,(err,transactions)=>{
            res.redirect('/');
        })
    })
};

module.exports = transactionController;