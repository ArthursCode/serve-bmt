import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared.module';
import {AppRoutingModule} from '../../app-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {EmployeesComponent} from './employees.component';
import { RemoveEmployeeComponent } from './modals/remove-employee/remove-employee.component';
import { EditEmployeeComponent } from './modals/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './modals/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './modals/view-employee/view-employee.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { AuthEmployeeComponent } from './modals/auth-employee/auth-employee.component';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';



@NgModule({
  declarations: [
    EmployeesComponent,
    RemoveEmployeeComponent,
    EditEmployeeComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    AuthEmployeeComponent
  ],
  entryComponents: [],
  imports: [
    SharedModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    NgxDropzoneModule,
    ClipboardModule
  ]
})
export class EmployeesModule { }
