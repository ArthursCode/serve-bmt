import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared.module";
import {ExpensesComponent} from "./expenses.component";
import {AppRoutingModule} from "../../app-routing.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import { StaffComponent } from './daily-costs/staff/staff.component';
import { OperatingCostsComponent } from './daily-costs/operating-costs/operating-costs.component';
import { AdminCostsComponent } from './daily-costs/admin-costs/admin-costs.component';
import { OtherComponent } from './daily-costs/other/other.component';
import { DailyCostsComponent } from './daily-costs/daily-costs.component';
import { BinComponent } from './bin/bin.component';
import { ActionsComponent } from './actions/actions.component';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RemoveCostsComponent} from "./actions/modals/remove-costs/remove-costs.component";
import {RestoreBinCostsComponent} from "./bin/modals/restore-bin-costs/restore-bin-costs.component";
import {RemoveBinCostsComponent} from "./bin/modals/remove-bin-costs/remove-bin-costs.component";
import {SaveCostsComponent} from "./daily-costs/modals/save-costs/save-costs.component";


@NgModule({
  declarations: [
    ExpensesComponent,
    StaffComponent,
    OperatingCostsComponent,
    AdminCostsComponent,
    OtherComponent,
    DailyCostsComponent,
    BinComponent,
    ActionsComponent,
    RemoveCostsComponent,
    RemoveBinCostsComponent,
    RestoreBinCostsComponent,
    SaveCostsComponent
  ],
  entryComponents: [
    RemoveCostsComponent,
    RemoveBinCostsComponent,
    RestoreBinCostsComponent,
    SaveCostsComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule
  ]
})
export class ExpensesModule { }
