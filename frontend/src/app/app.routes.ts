import { RouterModule, Routes} from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BudgetComponent} from './components/budget/budget.component';
import { NavigationComponent} from './components/navigation/navigation.component';
import { LoginComponent} from './components/login/login.component';

const app_routes: Routes =[
    {path: 'users', component: UsersComponent},
    {path: 'accounts', component: AccountsComponent},
    {path: 'transactions', component: TransactionsComponent},
    {path: 'budget', component: BudgetComponent},
    {path: 'login', component: LoginComponent},
    {path: 'navigation', component: NavigationComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: '**', redirectTo: '/login'}
];

export const app_routing = RouterModule.forRoot(app_routes);