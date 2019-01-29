export class Equipment {
    description: string;
    quantity: number;
    serialNumbers: string[];

    constructor(description: string, quantity: number, serialNumbers: string[]) {
        this.description = description;
        this.quantity = quantity;
        this.serialNumbers = serialNumbers;
    }
}
