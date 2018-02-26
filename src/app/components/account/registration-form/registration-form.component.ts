import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services';
import { UserRegistration } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  submitted = false;
  isRequesting = false;
  errors = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.email, value.password, value.firstName, value.lastName)
        .subscribe(result => {
          if (result) {
            this.isRequesting = false;
            this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
          }
        },
        errors => this.errors = errors);
    }
  }

}
