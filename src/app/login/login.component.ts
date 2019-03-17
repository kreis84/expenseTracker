import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { LogingService } from '../loging.service';
// import { userInfo } from 'os';

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
    this.name = 'testQuest';
    this.login = 'maro';
    this.password = 'maro92';
  }

  public onLoginClick(): void {
    this.spinner.turnOn();
    this.services.getUserByLogin(this.login).subscribe((user) => {
      this.spinner.turnOff();
      if(user.length !== 1 || user[0].password !== this.password){
        alert('Wrong login or password!');
      } else {
        this.loging.logUser();
        this.loging.user = user;
        this.router.navigate(['showHistory']);
      }
    })
  }

  public chartHovered(event): void{
    //
  }

  public chartClicked(event): void{
    //
  }

}
