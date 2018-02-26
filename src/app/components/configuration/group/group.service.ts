import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../services/abstractrestservice';
import { Group } from '../../../models';
import { UserService} from '../../../services/user.service';
import { Http } from '@angular/http';



@Injectable()
export class GroupService extends
    AbstractRestService<Group> {

    constructor(http: Http, user: UserService ) {
        super(http, 'http://localhost:5000/api/' + 'groups', user);
    }
}
