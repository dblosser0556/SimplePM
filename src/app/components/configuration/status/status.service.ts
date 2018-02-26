import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../services/abstractrestservice';
import { Status } from '../../../models';
import { UserService} from '../../../services/user.service';
import { Http } from '@angular/http';



@Injectable()
export class StatusService extends
    AbstractRestService<Status> {

    constructor(http: Http, user: UserService ) {
        super(http, 'http://localhost:5000/api/' + 'status', user);
    }
}
