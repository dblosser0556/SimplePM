import { Injectable } from '@angular/core';
import { AbstractRestService } from './abstractrestservice';
import { Budget } from '../models';
import { UserService } from './user.service';
import { Http } from '@angular/http';

@Injectable()
export class BudgetService extends AbstractRestService<Budget> {

    constructor(http: Http, user: UserService) {
        super(http, 'http://localhost:5000/api/' + 'budgets', user);
    }
}
