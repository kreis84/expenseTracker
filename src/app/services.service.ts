import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { filterQueryId } from '@angular/core/src/view/util';
import { map } from 'rxjs/operators';

@Injectable()
export class ServicesService {
  REST_DB_KEY = '5c69b216ad19dc08b020d4f2';
  httpOptions = {
    headers: new HttpHeaders({
      'x-apikey': this.REST_DB_KEY
    })
  };

  constructor(private http: HttpClient) { }

  public getAllExpens(): any {
    return this.http.get(`https://expensestracker-fcc2.restdb.io/rest/expens`, this.httpOptions);
  }

  public getExpensByUserId(userId): any {
    return this.http.get(`https://expensestracker-fcc2.restdb.io/rest/expens`, this.httpOptions)
      .pipe(map((expens: any[]) => expens.filter((ex) => ex.userId === userId)));
  }

  public getAllCategories(): any {
    return this.http.get(`https://expensestracker-fcc2.restdb.io/rest/categories`, this.httpOptions);
  }

  public getCategoriesByUser(userId): any {
    return this.http.get(`https://expensestracker-fcc2.restdb.io/rest/categories`, this.httpOptions)
      .pipe(map((cats: any[]) => cats.filter((cat) => cat.userId === userId || cat.userId === '1')));
  }
  
  public addNewCategory(catObj: any): any {
    return this.http.post(`https://expensestracker-fcc2.restdb.io/rest/categories`, catObj, this.httpOptions);

  }

  public getAllUsers(): any {
    return this.http.get(`https://expensestracker-fcc2.restdb.io/rest/userss`, this.httpOptions);
  }

  public addNewUser(user: object):any{
     return this.http.post(`https://expensestracker-fcc2.restdb.io/rest/userss`, user, this.httpOptions);
  }

  public addNewExpense(expense: object):any{
    return this.http.post(`https://expensestracker-fcc2.restdb.io/rest/expens`, expense, this.httpOptions);
 }
}