
export enum BudgetType {
    Capital,
    Expense
}
export class Budget {
    budgetId: number;
    budgetType: BudgetType;
    approvedDateTime: string;
    amount: number;
    projectId: number;
    groupId: number;


    constructor(private instanceData?: Budget) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: Budget) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(instanceData);

        for (const key of keys) {
           this[key] = instanceData[key];
        }
    }
}
