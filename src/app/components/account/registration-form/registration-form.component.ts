import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services';
import { UserRegistration, LoggedInUser, User } from '../../../models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit, OnChanges {

  @Input() currentUser: User;
  @Output() userChange = new EventEmitter<LoggedInUser>();

  user: LoggedInUser;
  submitted = false;
  isRequesting = false;
  errors = '';
  userRegistration: UserRegistration;
  registrationForm: FormGroup;
  roles = [];

  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.userService.getRoles().subscribe( result =>
      this.roles = result
    );
    this.userService.getLoggedInUser(this.currentUser.userName).subscribe (
      result => {
        let _loggedInUser = new LoggedInUser();
        _loggedInUser = result;
        this.user = _loggedInUser;
      }
    )
  }

  ngOnChanges() {


    this.registrationForm.reset( {
      userId: this.user.currentUser.userId,
      firstName: this.user.currentUser.firstName,
      lastName: this.user.currentUser.lastName,
      userName: this.user.currentUser.userName,
      email: this.user.currentUser.userName,
      password: this.user.currentUser.password} );
  }

  onSubmit() {
    this.registrationForm.updateValueAndValidity();
    if (this.registrationForm.invalid) {
      return;
    }

    this.userRegistration = this.getUserRegistrationFromFormValue(this.registrationForm.value);
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    if (this.user.currentUser.userId !== null) {
    this.userService.register(this.userRegistration)
      .subscribe(result => {
        if (result) {
          this.isRequesting = false;
        }
      },
        errors => this.errors = errors);
  }
}



  getUserRegistrationFromFormValue(formValue: any): UserRegistration {
    const userRegistration = formValue;
    let loggedInUser: LoggedInUser;
    loggedInUser = new LoggedInUser();

    loggedInUser.currentUser.userId = formValue.userId;
    loggedInUser.currentUser.firstName = formValue.firstName;
    loggedInUser.currentUser.lastName = formValue.lastName;
    loggedInUser.currentUser.email = formValue.email;
    loggedInUser.currentUser.password = formValue.password;
    loggedInUser.roles = formValue.roles;

    return userRegistration;

  }
  createForm() {
    this.registrationForm = this.fb.group({
      userId: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: ''
    }
    );
  }

  
  revert() {this.ngOnChanges(); }

}
