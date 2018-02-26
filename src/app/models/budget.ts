

export class Budget {
    budgetId: number;
    budgetType: string;
    approvedDateTime: string;
    amount: number;
    projectId: number;

    constructor(protected instanceData?: Budget) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    protected deserialize(instanceData: Budget) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(this);

        for (const key of keys) {
            if (instanceData.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}
