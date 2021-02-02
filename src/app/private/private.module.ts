import { NgModule } from '@angular/core';
import {SharedModule} from '../shared.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {ExpensesModule} from './expenses/expenses.module';
import {SettingsModule} from './settings/settings.module';
import {DepartmentsComponent} from './departments/departments.component';
import {ApplicantsComponent} from './applicants/applicants.component';
import {SubscriptionComponent} from './subscription/subscription.component';
import {EmployeesModule} from './employees/employees.module';
import {DepartmentsModule} from './departments/departments.module';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  imports: [
    SharedModule,
    DashboardModule,
    ExpensesModule,
    SettingsModule,
    EmployeesModule,
    DepartmentsModule,
    MatTableModule
  ],
  declarations: [
    DepartmentsComponent,
    ApplicantsComponent,
    SubscriptionComponent
  ]
})
export class PrivateModule { }
