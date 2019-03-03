import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LogingService {
  userLogged = new BehaviorSubject(false);
  actualUser: any;

  constructor() { }

  get logged(): Observable<boolean> {
    return this.userLogged;
  }

  get user(): any{
    return this.actualUser;
  }

  set user(user){
    this.actualUser = user;
  }

  public logUser(): void {
    this.userLogged.next(true);
  }

  public logOutUser(): void {
    this.user = null;
    this.userLogged.next(false);
  }
}
