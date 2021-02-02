import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../expenses/daily-costs/staff/staff.component';
import * as _moment from 'moment';
import {dateTimeFormat} from '../../common/constants/constants';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {AddDepartmentComponent} from './modals/add-department/add-department.component';
import {EditDepartmentComponent} from './modals/edit-department/edit-department.component';
import {RemoveDepartmentComponent} from './modals/remove-department/remove-department.component';
import {DepartmentsService} from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DepartmentsComponent implements OnInit {
  displayedColumns: string[] = ['saved_date', 'dep_name', 'dep_employees', 'actions'];
  dataSource = [];

  length = 0;
  total = 0;

  depListParams = {
    current: 1,
    per_page: 10,
    filters: {
      name: '',
    }
  };

  constructor(public dialog: MatDialog,
              private departmentsService: DepartmentsService,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.getDepartmentsList(this.depListParams);
  }

  getDepartmentsList(event) {
    this.depListParams = {...this.depListParams, ...event};
    this.departmentsService.getDepartmentsList(this.depListParams).subscribe(
      res => {
        if (res){
          this.length = res.length;
          this.total = res.total;
          this.dataSource = res.data;
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
    this.depListParams.filters = {
      name: ''
    };
    this.getDepartmentsList(this.depListParams);
  }
  searchRec() {
    this.depListParams.current = 1;
    this.getDepartmentsList(this.depListParams);
  }

  addDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {autoFocus: false});
    dialogRef.componentInstance.onSave.subscribe((data) => {
      this.addDepartmentData(data, dialogRef);
    });
  }

  editDepartment(department) {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {autoFocus: false, data: {name: department.name}});
    dialogRef.componentInstance.onSave.subscribe((data) => {
      this.editDepartmentData(data, department.id, dialogRef);
    });
  }
  removeDepartment(department) {
    const dialogRef = this.dialog.open(RemoveDepartmentComponent, {data: {name: department.name}});
    dialogRef.componentInstance.onRemove.subscribe(() => {
      this.removeDepartmentData(department.id, dialogRef);
    });
  }

  addDepartmentData(data, dialogRef) {
    const reqObj = data;
    this.departmentsService.addDepartment(reqObj).subscribe(
      (res: any) => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
          this.toastr.success(text);
          this.getDepartmentsList(this.depListParams);
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
  editDepartmentData(data, id, dialogRef) {
    const reqObj = data;
    this.departmentsService.editDepartment(reqObj, id).subscribe(
      (res: any) => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
          this.toastr.success(text);
          this.getDepartmentsList(this.depListParams);
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
  removeDepartmentData(id, dialogRef) {
    this.departmentsService.removeDepartment(id).subscribe(
      (res: any) => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
          this.toastr.success(text);
          this.getDepartmentsList(this.depListParams);
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

  formatTime(date){
    if (date){
      return _moment(date).format(dateTimeFormat);
    }
    return '';
  }

}
