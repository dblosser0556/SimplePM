import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../../models';
import { UserService } from '../../../services';
import { HttpErrorResponse } from '@angular/common/http/src/response';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {


  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted = false;
  userName: string;
  credentials: Credentials = { email: '', password: '' };

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.email = param['email'];
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }
  cancel() {
    this.router.navigate(['']);
  }
  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.userName = value.email;

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.email, value.password)
        .subscribe(result => {

          if (result) {
           
            this.userService.getLoggedInUser(this.userName)
              .subscribe(result2 => {
                this.isRequesting = false;
                this.router.navigate(['/dashboard/home']);
              },
              error => {
                this.isRequesting = false;
                this.errors = error.message;
              }
            );
          }
        },
        error => this.errors = error.message);
    }
  }
}

