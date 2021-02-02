import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AddDepartmentComponent } from './modals/add-department/add-department.component';
import { EditDepartmentComponent } from './modals/edit-department/edit-department.component';
import { RemoveDepartmentComponent } from './modals/remove-department/remove-department.component';
import {SharedModule} from '../../shared.module';



@NgModule({
  declarations: [
    AddDepartmentComponent,
    EditDepartmentComponent,
    RemoveDepartmentComponent
  ],
  imports: [
    SharedModule,
    MatTableModule,
  ]
})
export class DepartmentsModule { }
