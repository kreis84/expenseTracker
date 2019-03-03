import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { LoaderService } from './../loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  name;
  password;
  login;

  constructor(private services: ServicesService,
              private spinner: LoaderService, 
              private router: Router) { }

  public onRegisterClick(): void {
    this.spinner.turnOn();
    const newUser = {
      name: this.name,
      password: this.password,
      login: this.login
    }
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
