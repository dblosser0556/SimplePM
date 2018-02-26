import { Budget } from './budget';
import { Resource } from './resource';
import { Month } from './month';
import { FixedPrice } from './fixed-price';
import { ResourceLoader } from '@angular/compiler';

export class Project {
    budgets: Budget[] = [];
    months: Month[] = [];
    resources: Resource[] = [];
    fixedPriceCosts: FixedPrice[] = [];

    projectId: number = null;
    projectName: string = null;
    projectDesc: string = null;
    projectManager: string = null;
    plannedStartDate: string = null;
    actualStartDate: string = null;
    groupId: number = null;
    groupName: string = null;
    groupManager: string = null;
    statusId: number = null;
    statusName: string = null;

    constructor(protected instanceData?: Project) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: Project) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(instanceData[0]);

        for (const key of keys) {
            {
                let data = instanceData[0][key]
                switch (key) {
                    case 'fixedPriceCosts':
                        this.fixedPriceCosts = (data != null) ? data.map(d => new FixedPrice(d)) : [];
                        break;
                    case 'budgets':
                        this.budgets = (data != null) ? data.map(d => new Budget(d)) : [];
                        break;
                    case 'months':
                        this.months = (data != null) ? data.map(d => new Month(d)) : [];
                        break;
                    case 'resources':
                        this.resources = (data != null) ? data.map(d => new Resource(d)) : [];
                        break;
                    default:
                        this[key] = data;
                };

            }
        }
    }
}





