import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../expenses/daily-costs/staff/staff.component';
import {AddEmployeeComponent} from './modals/add-employee/add-employee.component';
import {MatDialog} from '@angular/material/dialog';
import {EditEmployeeComponent} from './modals/edit-employee/edit-employee.component';
import {RemoveEmployeeComponent} from './modals/remove-employee/remove-employee.component';
import {ViewEmployeeComponent} from './modals/view-employee/view-employee.component';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EmployeesComponent implements OnInit {

  data: any;
  cropperSettings: CropperSettings;


  mathOps = [
    {key: '>='},
    {key: '='},
    {key: '<='}
  ];

  empListParams = {
    current: 1,
    per_page: 9,
    filters: {
      salary: '',
      math_op_salary: '=',
      age: '',
      math_op_age: '=',
      full_name: '',
      start: '',
      end: ''
    }
  };

  constructor(public dialog: MatDialog) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;

    this.data = {};
  }

  ngOnInit(): void {
  }

  getEmployeeList(event) {
    this.empListParams = {...this.empListParams, ...event};
  }
  resetFilters() {
    this.empListParams.filters = {
      full_name: '',
      salary: '',
      math_op_salary: '=',
      age: '',
      math_op_age: '=',
      start: '',
      end: ''
    };
    this.getEmployeeList(this.empListParams);
  }
  searchRec() {
    this.empListParams.current = 1;
    this.getEmployeeList(this.empListParams);
  }
  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeComponent);
    dialogRef.componentInstance.onSave.subscribe(() => {
      console.log('add employee');
      dialogRef.close();
    });
  }

  editEmployee() {
    const dialogRef = this.dialog.open(EditEmployeeComponent);
    dialogRef.componentInstance.onSave.subscribe(() => {
      console.log('edit employee');
      dialogRef.close();
    });
  }
  removeEmployee() {
    const dialogRef = this.dialog.open(RemoveEmployeeComponent);
    dialogRef.componentInstance.onRemove.subscribe(() => {
      console.log('remove employee');
      dialogRef.close();
    });
  }
  viewEmployee() {
    this.dialog.open(ViewEmployeeComponent);
  }
}
