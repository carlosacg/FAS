//ESQUEMA DE MONGO PARA EL ENVIO DE DATOS ANGULAR-MYSQL

export class Item {
    constructor(item_number='',budget_number='',planned_balance='',spent_balance='',description=''){
        this.item_number=item_number;
        this.budget_number=budget_number;
        this.planned_balance=planned_balance;
        this.spent_balance=spent_balance;
        this.description=description;

    }
    budget_number: string;
    item_number : string;
    planned_balance : string;
    spent_balance : string;
    description : string;
}