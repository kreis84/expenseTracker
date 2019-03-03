import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { LogingService } from '../loging.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  formGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    category: new FormControl('')
  });
  categories: any[];
  selectedCategory = 'Select category';

  constructor(    private services: ServicesService,
    private router: Router,
    private loging: LogingService,
    private spinner: LoaderService) { 
      this.spinner.turnOn();
      const user = this.loging.user;
      this.services.getCategoriesByUser(user._id).subscribe((categories: any[]) => {
        this.categories = categories;
        this.spinner.turnOff();
      });
  
    }

  ngOnInit() {
  }

  public onCategorySelect(category): void{
    this.selectedCategory = category;
  }

}
