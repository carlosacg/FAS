import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {app_routing} from './app.routes';
import { AccountsComponent } from './components/accounts/accounts.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BudgetComponent } from './components/budget/budget.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavigationComponent,
    AccountsComponent,
    TransactionsComponent,
    BudgetComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
