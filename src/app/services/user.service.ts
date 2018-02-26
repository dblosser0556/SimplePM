import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import '../rxjs-extensions';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { LoggedInUser } from '../models';

@Injectable()
export class UserService  {
  _url = 'http://localhost:5000/api';
  loggedIn = false;
  loggedInUser: LoggedInUser;
  authorityToken: string;
  

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string, firstName: string, lastName: string) {
    const body = JSON.stringify({ email, password, firstName, lastName });
    const headerOptions = new HttpHeaders()
                    .set('Content-Type', 'application/json');
    return this.http.post(this._url + '/accounts', body, {headers: headerOptions, responseType: 'text'})
            .map(res => true)
            .catch(x => this.handleAuthError(x));
  }

  login(userName: string, password: string) {
    const body = JSON.stringify({ userName, password });
    const headerOptions = new HttpHeaders()
                    .set('Content-Type', 'application/json');
    return this.http.post(this._url + '/auth/login', body, {headers: headerOptions, responseType: 'text'})
            .map(res => {
              const tok = JSON.parse(res);
              this.authorityToken =  tok.auth_token;
              this.loggedIn = true;
              this._authNavStatusSource.next(true);
              return true;
            })
            .catch(x => this.handleAuthError(x));

  }

  getLoggedInUser(userName: string) {
    const authToken = localStorage.getItem('auth_token');
    const headerOptions = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken );
    return this.http.get<LoggedInUser>(this._url + '/auth/user/' + userName, {headers: headerOptions})
      .map( res => {
        this.loggedInUser = res; })
      .catch(x => this.handleAuthError(x));

  }

  logOut ( ) {
    this.loggedInUser = null;
    this.loggedIn = false;
    this.authorityToken = '';
    this._authNavStatusSource.next(true);
  }
  isLoggedIn() {
    return this.loggedIn;
  }


  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 400 || err.status === 401 || err.status === 403) {
        // navigate /delete cookies or whatever
        this.router.navigateByUrl('/login');
        // tslint:disable-next-line:max-line-length
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return Observable.of(err.message);
    }
    return Observable.throw(err.message);
  }
}


