import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() selectedCategoriesNames: any[];
  @Input() categories: any[];
  @Input() expenses: any[];
  items: any;
  renderObject: any[];

  constructor() { }

  ngOnInit() {
    this.prepareRenderObject();
  }

  public prepareRenderObject(): void {
    this.renderObject = [];
    this.selectedCategoriesNames
      .forEach(catName => this.renderObject.push({ catName: catName, catId: this.getCategoryId(catName) }));
    this.renderObject.forEach((render) => {
      let dates = this.expenses.filter(expense => expense.categoryId === render.catId)
        .map(expens => expens.date)
        .map(date => moment(date).format('DD.MM.YYYY'));
      dates = Array.from(new Set(dates));
      dates = dates.sort((a,b) => moment(a).isBefore(moment(b)) ? -1 : 0);
      render.dates = dates.map(date => ({date: date}));
      render.dates
        .forEach(date => date.expenses = this.expenses.filter(expens => moment(expens.date).isSame(moment(date), 'days') && expens.categoryId === render.catId));
    });
    this.renderObject = this.renderObject.filter(cat => cat.dates.length > 0);
    console.log(this.renderObject);
  }

  public getDate(expense): string {
    return moment(expense.date).format('DD.MM.YYYY');
  }

  public getCategoryId(categoryName: string): string {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      return category._id;
    }
    return null;
  }

  public getDateExpensesSum(date): number{
    return date.expenses.map(e => e.value).reduce((acc, i) => acc + i, 0);
  }

  public getCategorySum(catDates): number{
    let temp = catDates.map(date => date.expenses).flat().map(ex => ex.value).reduce((acc, i) => acc + i, 0);
    console.log(temp);
    // temp = temp.flat();
    console.log(temp);
    return temp;
  }
}
