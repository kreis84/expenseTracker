import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { LogingService } from '../loging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name;
  login;
  password;
  @ViewChild('warrning') warrning: any;

  constructor(private services: ServicesService,
              private router: Router,
              private loging: LogingService,
              private spinner: LoaderService) { }

  ngOnInit() {
    this.name = 'quest';
    this.login = 'quest';
    this.password = 'quest123!';
  }

  public onLoginClick(): void {
    this.spinner.turnOn();
    this.services.getAllUsers().subscribe((users) => {
      const user = users.find((user) => user.login === this.login && user.password === this.password);
      this.spinner.turnOff();
      if(!user){
        alert('Wrong login or password!');
      } else {
        this.loging.logUser();
        this.loging.user = user;
        this.router.navigate(['showHistory']);
      }
    })
  }
}
