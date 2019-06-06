import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';
import { LogingService } from './loging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app works!';
  showLoader: boolean = false;
  switchButtonText = 'Add expense';

  constructor(private services: ServicesService,
    private router: Router,
    public loging: LogingService,
    public loaderApi: LoaderService) {
  }

  ngOnInit() {
    this.loaderApi.status.subscribe((value) => {
      this.showLoader = value;
    });
    this.router.navigate(['login']);
  }

  public onLogOut(): void {
    this.loging.logOutUser();
    this.switchButtonText = 'Add expense';
    this.router.navigate(['login']);
  }

  public onSwitchButtonClick(): void {
    if (this.switchButtonText === 'Add expense') {
      this.router.navigate(['addExpense']);
      this.switchButtonText = 'Show history';
    } else {
      this.router.navigate(['showHistory']);
      this.switchButtonText = 'Add expense';
    }
  }
}
