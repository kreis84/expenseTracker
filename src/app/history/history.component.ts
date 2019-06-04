import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { LogingService } from '../loging.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  formGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });
  categories: any[];
  expenses: any[];
  selectedCategories: any[] = [];
  selectedExpenses: any[];

  showHistory: boolean = false;
  chartsTypes = ['bar','line','doughnut'];
  selectedChartType = 'bar';
  barChartLegend: boolean = true;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private services: ServicesService,
              private router: Router,
              private loging: LogingService,
              private spinner: LoaderService,
              private chandeDetector: ChangeDetectorRef) {
    this.spinner.turnOn();
    const user = this.loging.user;
    combineLatest(this.services.getCategoriesByUser(user._id), this.services.getExpensByUserId(user._id))
      .subscribe(([categories, expenses]: [any[], any[]]) => {
        this.expenses = expenses;
        this.categories = categories;
        this.spinner.turnOff();
      });
  }

  ngOnInit() {
  }
  
  public prepareDataForChart(expenses: any[]): void{
    let startDate;
    let endDate;
    if(this.formGroup.get('startDate').value !== '' && this.formGroup.get('endDate').value !=='')
    {
      startDate = this.makeMomentDate(this.formGroup.get('startDate').value);
      endDate = this.makeMomentDate(this.formGroup.get('endDate').value);
    } else {
      const startEnd = this.findStartEndDate(expenses);
      startDate = startEnd.start;
      endDate = startEnd.end;
    }
    const selectedCategoriesObject = this.selectedCategories
      .map(catName => this.categories.find((cat) => cat.name === catName));
    const days = endDate.diff(startDate, 'days') + 1;
    this.barChartLabels = this.getDatesListAsString(startDate, endDate);
    this.barChartData = selectedCategoriesObject.map((category) => {
      const expensesForCategory = expenses.filter(expens => expens.categoryId === category._id);
      const dataForDates = this.barChartLabels.map((dateAsString) => {
        const currentDate = moment(dateAsString, 'DD.MM.YYYY');
        let expensesForCurrentDate = expensesForCategory.filter((expense) => {
          return moment(expense.date, 'DD.MM.YYYY').isSame(currentDate, 'days');
        });
        expensesForCurrentDate = expensesForCurrentDate.reduce((acc, item) => acc + item.value ,0);
        return expensesForCurrentDate;
      })
       return {
        data: dataForDates,
        label: category.name
      }
    });
  }

  public findStartEndDate(expenses: any[]): {start: any, end: any}{
    const momentDates: any[] = expenses.map((expens) => moment(expens.date, 'DD.MM.YYYY'));
    return {start: moment.min(momentDates), end: moment.max(momentDates)}
  }

  public onShowHistoryClick(): void {
    this.showHistory = false;
    this.selectedExpenses = this.filterExpensesBySearchCriteria();
    this.prepareDataForChart(this.selectedExpenses);
    setTimeout(() => {
      this.showHistory = true;
    }, 0);
  }

  public filterExpensesBySearchCriteria(): any[]{
    const categoriesIds = this.categories
      .filter((cat) => this.selectedCategories.includes(cat.name))
      .map((cat) => cat._id);
    let filteredExpenses = this.expenses.filter((expense) =>categoriesIds.includes(expense.categoryId));
    if(this.formGroup.get('startDate').value !== ''){
      const earliestDate = this.makeMomentDate(this.formGroup.get('startDate').value);
      filteredExpenses = filteredExpenses.filter((expens) => moment(expens.date, 'DD.MM.YYYY').isSameOrAfter(earliestDate));
    }
    if(this.formGroup.get('endDate').value !== ''){
      const latestDate = this.makeMomentDate(this.formGroup.get('endDate').value);
      latestDate.hour(24);
      filteredExpenses = filteredExpenses.filter((expens) => moment(expens.date, 'DD.MM.YYYY').isSameOrBefore(latestDate));
    }
    return filteredExpenses;
  }

  public makeMomentDate(date: any): any {
    return moment(`${date.day}.${date.month}.${date.year}`, 'DD.MM.YYYY');
  }

  public chanegeCategory($event): void {
    const id = $event.target.id;
    const checked = $event.target.checked;
    if (checked) {
      this.selectedCategories.push(id);
    } else {
      this.selectedCategories = this.selectedCategories.filter((it) => it !== id);
    }
    console.log(this.selectedCategories);
  }

  public getDatesListAsString(start, end) {
    let arr = [];
    const dt = new Date(start);
  
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    arr = arr.map((date) => moment(date).format('DD.MM.YYYY'));
    return arr;
  }

  public onChartTypeSelect(type): void {
    this.selectedChartType = type;
  }

  public isShowDisabled(): boolean{
    return this.selectedCategories.length < 1;
  }

  public onSelectAllCatergoriesClick(): void{
    this.selectedCategories = [...this.categories.map( cat => cat.name)];
  }

  public onDeselectAllCatergoriesClick(): void {
    this.selectedCategories = [];
  }

  public checkIfChecked(catName): boolean{
    return this.selectedCategories.some((name) => name === catName);
  }
}
