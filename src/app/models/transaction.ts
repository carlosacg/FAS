export class Transaction {
    constructor(transaction_number = '', item_number = '', account_number = '', spent_date = '', spent_balance = '', description = '') {
        this.transaction_number = transaction_number;
        this.account_number = account_number;
        this.item_number = item_number;
        this.spent_date = spent_date;
        this.description = description;
    }
    transaction_number: string;
    item_number: string;
    account_number: string;
    spent_date: string;
    spent_balance: string;
    description: string;
}