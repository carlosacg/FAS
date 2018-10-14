//ESQUEMA DE MONGO PARA EL ENVIO DE DATOS ANGULAR-MYSQL

export class Budget {
    constructor(budget_number='',budget_name='',initial_date='',end_date='',identification=''){
        this.identification=identification;
        this.budget_number=budget_number;
        this.budget_name=budget_name;
        this.initial_date=initial_date;
        this.end_date=end_date;

    }
    identification: string;
    budget_number: string;
    budget_name : string;
    initial_date : string;
    end_date : string;
}