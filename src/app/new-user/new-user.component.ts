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
    // const newUser = {
    //   name: this.formGroup.get('name').value,
    //   password: this.formGroup.get('password').value,
    //   login: this.login
    // }
    this.services.getAllUsers().subscribe((users: any[]) => {
      const findedUser = users.find((user) => user.login === this.login);
      if (findedUser) {
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
