import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { LogingService } from '../loging.service';
import { startWith } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'add-expense',
  templateUrl: './addExpense.component.html',
  styleUrls: ['./addExpense.component.scss']
})
export class AddExpenseComponent {
  categories: any[];
  showNewCateSection = false;
  newCategoryName;
  description;
  value;
  selectedCategory = 'Select category';
  saveDisabled = true;

  formGroup = new FormGroup ({
    selectedCategory: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  })

  constructor(private cd: ChangeDetectorRef,
    private services: ServicesService,
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

  public onCategorySelect(category: any): void {
    this.selectedCategory = category.name;
    this.formGroup.get('selectedCategory').patchValue(category.name);
  }

  public onAddNewCategory(): void {
    const userId = this.loging.user._id;
    const newCategory = {name: this.newCategoryName, userId: userId};
    this.spinner.turnOn();
    this.services.addNewCategory(newCategory).subscribe((response) => {
      this.spinner.turnOff();
      this.categories.push(response);
      alert('New category successfuly added.');
      this.showNewCateSection = false;
    });
  }

  public onAddNewExpense(): void{
    const newExpense = this.formGroup.getRawValue();
    const category = this.categories.find((cat) => cat.name === newExpense.selectedCategory);
    newExpense.userId = this.loging.user._id;
    newExpense.categoryId = category._id;
    newExpense.desc = newExpense.description;
    newExpense.date = new Date();
    this.spinner.turnOn();
    this.services.addNewExpense(newExpense).subscribe(() => {
      this.spinner.turnOff();
      alert('New expense successfuly added.');
      this.formGroup.reset();
      this.selectedCategory = 'Select category';
    });
  }
}
