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

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("289312158718-vhs2e0pghd0081amen631t9brgp3eoqr.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2052340698429751")
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavigationComponent,
    AccountsComponent,
    TransactionsComponent,
    BudgetComponent,
    LoginComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    app_routing,
    SocialLoginModule.initialize(config),
    BrowserModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
