import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { LoaderService } from './../loader.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  name;
  password;
  login;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required])
  })


  constructor(private services: ServicesService,
              private spinner: LoaderService, 
              private router: Router) { }

  public onRegisterClick(): void {
    this.spinner.turnOn();
    const newUser = this.formGroup.getRawValue();
    this.services.getUserByLogin(newUser.login).subscribe((user) => {
      if (user.length > 0) {
        this.spinner.turnOff();
        alert('User with same login already exist');
      } else {
        this.services.addNewUser(newUser).subscribe((response) => {
          alert('New user successfuly created.');
          this.spinner.turnOff();
          this.router.navigate(['login']);
        })
      }
    })
  }
}
