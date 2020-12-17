import { NgModule } from '@angular/core';
import {SharedModule} from '../shared.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {ExpensesModule} from './expenses/expenses.module';
import {SettingsModule} from './settings/settings.module';
import {WorkersComponent} from './workers/workers.component';
import {DepartmentsComponent} from './departments/departments.component';
import {ApplicantsComponent} from './applicants/applicants.component';
import {SubscriptionComponent} from './subscription/subscription.component';


@NgModule({
  imports: [
    SharedModule,
    DashboardModule,
    ExpensesModule,
    SettingsModule
  ],
  declarations: [
    WorkersComponent,
    DepartmentsComponent,
    ApplicantsComponent,
    SubscriptionComponent
  ]
})
export class PrivateModule { }
