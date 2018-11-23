export class Account {
    constructor(account_number='',type_account='',positive_balance=0,negative_balance=0,description='',bank_name='', identification=''){
        this.identification=identification;
        this.account_number=account_number;
        this.type_account=type_account;
        this.positive_balance=positive_balance;
        this.negative_balance=negative_balance;
        this.description=description;
        this.bank_name=bank_name;

    }
    identification: string;
    account_number: string;
    type_account : string;
    positive_balance : number;
    negative_balance : number;
    description : string;
    bank_name : string;
}