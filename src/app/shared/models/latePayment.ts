export class LatePayment {
    amount: number;
    entity: string;
    reference: string;
    dueDate: string;
    name: string;

    constructor(amount_claimed__c: number, aux_entity__c: string , aux_reference__c: string,
                due_date__c: string, name: string) {
        this.amount = amount_claimed__c;
        this.entity = aux_entity__c;
        this.reference = aux_reference__c;
        this.dueDate = due_date__c;
        this.name = name;
    }
}
