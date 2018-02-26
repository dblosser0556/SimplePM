import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../services/abstractrestservice';
import { ConfigService } from '../../../services';
import { Project, ProjectList } from '../../../models';
import { UserService } from '../../../services';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjectService extends
    AbstractRestService<Project> {

    constructor( http: Http, user: UserService, private config: ConfigService ) {
        super(http, 'http://localhost:5000/api/' + 'projects', user);
    }

    getList(): Observable<ProjectList[]> {
        const headerOptions = this.getHeader();
        const requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            headers: headerOptions
        });
        return this._http.get(this.actionUrl, requestOptions)
            .map((res: Response) => res.json())
            .pipe(catchError(this.handleError)
            );
    }

    getOne(id: number): Observable<Project> {
        const url = `${this.actionUrl}/${id}`;
        const headerOptions = this.getHeader();
        const requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            headers: headerOptions
        });
        return this._http.get(url, requestOptions)
            .map((data: Response) => data.json())
            .map((data: Project) => new Project(data))
            .pipe(catchError(this.handleError)
            );
    }
}
