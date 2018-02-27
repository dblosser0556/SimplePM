import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../../services';
import { UserRegistration } from '../../../models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit, OnChanges {

  submitted = false;
  isRequesting = false;
  errors = '';
  userRegistration: UserRegistration;
  registrationForm: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {


    this.registrationForm.reset( {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: ''} );
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

    this.userService.register(this.userRegistration)
      .subscribe(result => {
        if (result) {
          this.isRequesting = false;
        }
      },
        errors => this.errors = errors);
  }



  getUserRegistrationFromFormValue(formValue: any): UserRegistration {
    const userRegistration = formValue;
    return userRegistration;

  }
  createForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    }
    );
  }
  revert() {this.ngOnChanges(); }

}
