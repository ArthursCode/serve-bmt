import { Routes } from '@angular/router';
import {AuthGuard} from '../common/auth/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DepartmentsComponent} from './departments/departments.component';
import {ApplicantsComponent} from './applicants/applicants.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {expensesRoutes} from './expenses/expenses.routing';
import {SubscriptionComponent} from './subscription/subscription.component';
import {SettingsComponent} from './settings/settings.component';
import {EmployeesComponent} from './employees/employees.component';

export const privateRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'applicants',
    component: ApplicantsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    canActivate: [AuthGuard],
    children: [...expensesRoutes]
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  }
];

