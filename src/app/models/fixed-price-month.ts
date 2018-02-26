export class FixedPriceMonth {
    fixedPriceMonthId: number = null;
    
    monthNo: number = null;
    plannedCost: number  = null;
    plannedCostCapPercent: number  = null;
    actualCost: number  = null;
    actualCostCapPercent: number  = null;

    fixedPriceId: number = null;
    constructor(protected data?: FixedPriceMonth) {
        if (data) {
            this.deserialize(data);
        }
    }
    private deserialize(data: FixedPriceMonth) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(data);

        for (const key of keys) {
            this[key] = data[key];
        }
    }

}