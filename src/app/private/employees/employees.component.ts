import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../expenses/daily-costs/staff/staff.component';
import {AddEmployeeComponent} from './modals/add-employee/add-employee.component';
import {MatDialog} from '@angular/material/dialog';
import {EditEmployeeComponent} from './modals/edit-employee/edit-employee.component';
import {RemoveEmployeeComponent} from './modals/remove-employee/remove-employee.component';
import {ViewEmployeeComponent} from './modals/view-employee/view-employee.component';
import {EmployeesService} from './employees.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {AuthEmployeeComponent} from './modals/auth-employee/auth-employee.component';
import * as _moment from 'moment';
import {dateFormat} from '../../common/constants/constants';

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
  employeeList: any;
  length = 0;
  total = 0;
  mathOps = [
    {key: '>='},
    {key: '='},
    {key: '<='}
  ];

  empListParams = {
    current: 1,
    per_page: 8,
    filters: {
      salary: '',
      math_op: '=',
      full_name: '',
      start: '',
      end: ''
    }
  };

  constructor(public dialog: MatDialog,
              private employeesService: EmployeesService,
              private toastr: ToastrService,
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.getEmployeeList(this.empListParams);
  }

  getEmployeeList(event) {
    this.empListParams = {...this.empListParams, ...event};
    this.employeesService.getEmployeesList(this.empListParams).subscribe(
      res => {
        if (res){
          this.length = res.length;
          this.total = res.total;
          this.employeeList = res.data;
        }
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }
  resetFilters() {
    this.empListParams.filters = {
      full_name: '',
      salary: '',
      math_op: '=',
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
    const dialogRef = this.dialog.open(AddEmployeeComponent, {autoFocus: false, width: '515px'});
    dialogRef.componentInstance.onSave.subscribe((data) => {
      this.addEmployeeData(data, dialogRef);
    });
  }

  editEmployee(employee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {autoFocus: false, width: '515px', data: employee});
    dialogRef.componentInstance.onSave.subscribe((data) => {
      this.editEmployeeData(data, employee.id, dialogRef);
    });
  }
  removeEmployee(employee) {
    const dialogRef = this.dialog.open(RemoveEmployeeComponent, {data: {full_name: employee.full_name}});
    dialogRef.componentInstance.onRemove.subscribe(() => {
      this.removeEmployeeData(employee.id, dialogRef);
    });
  }
  viewEmployee(employee) {
    this.dialog.open(ViewEmployeeComponent, {autoFocus: false, width: '400px', data: employee});
  }
  authEmployee(id) {
    const dialogRef = this.dialog.open(AuthEmployeeComponent);
    dialogRef.componentInstance.onSave.subscribe((data) => {
      this.authEmployeeData(data, dialogRef);
    });
  }


  addEmployeeData(data, dialogRef) {
    const reqObj = {...data, birth_date: _moment(data.birth_date, 'MM-DD-YYYY').format(dateFormat)};
    this.employeesService.addEmployee(reqObj).subscribe(
      (res: any) => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
          this.toastr.success(text);
          this.getEmployeeList(this.empListParams);
          dialogRef.close();
        });
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }
  editEmployeeData(data, id, dialogRef) {
    const reqObj = {...data, birth_date: _moment(data.birth_date, 'MM-DD-YYYY').format(dateFormat)};
    this.employeesService.editEmployee(reqObj, id).subscribe(
      (res: any) => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
          this.toastr.success(text);
          this.getEmployeeList(this.empListParams);
          dialogRef.close();
        });
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }
  removeEmployeeData(id, dialogRef) {
    this.employeesService.removeEmployee(id).subscribe(
      (res: any) => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
          this.toastr.success(text);
          this.getEmployeeList(this.empListParams);
          dialogRef.close();
        });
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }
  viewEmployeeData(data) {

  }
  authEmployeeData(data, dialogRef){

  }
}
