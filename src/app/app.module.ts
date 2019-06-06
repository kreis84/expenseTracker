import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServicesService } from './services.service';
import { AppComponent } from './app.component';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { LoaderService } from './loader.service';
import { AddExpenseComponent } from './addExpense/addExpense.component';
import { LogingService } from './loging.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { HistoryListComponent } from './history-list/history-list.component';
import { MessageComponent } from './message/message.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'addExpense', component: AddExpenseComponent },
  { path: 'showHistory', component: HistoryComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewUserComponent,
    AddExpenseComponent,
    HistoryComponent,
    HistoryListComponent,
    MessageComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [ServicesService, LoaderService, LogingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
