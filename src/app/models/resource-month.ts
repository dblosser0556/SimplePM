export class ResourceMonth {
    
    resourceMonthId: number = null;
    monthNo: number = null;
    plannedEffort: number = null;
    plannedEffortCapPercent: number = null;
    actualEffort: number = null;
    actualEffortCapPercent: number = null;
    
    

    resourceId: number = null;

    constructor(protected instanceData?: ResourceMonth) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: ResourceMonth) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(instanceData);

        for (const key of keys) {

            this[key] = instanceData[key];

        }
    }
}
