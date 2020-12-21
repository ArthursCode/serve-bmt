import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ExpensesService} from '../expenses.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import * as _moment from 'moment';
import {dateFormat, dateTimeFormat, tableDateFormat} from '../../../common/constants/constants';
import {RemoveCostsComponent} from './modals/remove-costs/remove-costs.component';
import {MatDialog} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../daily-costs/staff/staff.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ActionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['checkbox', 'category', 'payment_date', 'sub_category', 'sum', 'time', 'actions'];
  dataSource = [];
  allChecked = false;
  zero = 0;
  mathOps = [
    {key: '>='},
    {key: '='},
    {key: '<='}
  ];

  categoryAll = [
    { label: 'Other', key: 'other', group: null, child: { state: 'Active' } },
    { label: 'Employee salaries', key: 'salaries', group: 'Staff and benefits', child: { state: 'Active' } },
    { label: 'Payroll taxes', key: 'taxes', group: 'Staff and benefits', child: { state: 'Active' } },
    { label: 'Employee Benefits and Pensions', key: 'benefits', group: 'Staff and benefits', child: { state: 'Active' } },
    { label: 'Insurances', key: 'insurances', group: 'Staff and benefits', child: { state: 'Active' } },

    { label: 'Utilities and phone', key: 'utilities', group: 'Operating costs', child: { state: 'Active' } },
    { label: 'Building rent and expenses', key: 'building', group: 'Operating costs', child: { state: 'Active' } },
    { label: 'Equipment lease', key: 'equipment_leases', group: 'Operating costs', child: { state: 'Active' } },
    { label: 'Equipment expenses', key: 'equipment_expenses', group: 'Operating costs', child: { state: 'Active' } },

    { label: 'Advertising', key: 'advertising', group: 'Administrative costs', child: { state: 'Active' } },
    { label: 'Dues and subscriptions', key: 'subscriptions', group: 'Administrative costs', child: { state: 'Active' } },
    { label: 'Legal and accounting', key: 'accounting', group: 'Administrative costs', child: { state: 'Active' } },
    { label: 'Repairs an maintenance', key: 'repairs', group: 'Administrative costs', child: { state: 'Active' } },
    { label: 'Office and computer supplies', key: 'supplies', group: 'Administrative costs', child: { state: 'Active' } },
  ];

  length = 0;
  total = 0;

  costListParams = {
    current: 1,
    per_page: 10,
    filters: {
      sum: '',
      math_op: '=',
      payment_date: '',
      sub_category: []
    }
  };

  constructor(private expensesService: ExpensesService,
              private toastr: ToastrService,
              private translate: TranslateService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCostsList(this.costListParams);
  }

  getCostsList(event) {
    this.costListParams = {...this.costListParams, ...event};
    this.allChecked = false;
    this.expensesService.getExpensesList(this.costListParams).subscribe(
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

  adjustText(el){
    if (el.category !== 'other'){
      return el.sub_category.replace('_', ' ');
    }
    return el.sub_category;
  }

  formatDate(date){
    if (date){
      return _moment(date, 'MM-DD-YYYY').format(tableDateFormat);
    }
    return '';
  }

  formatTime(date){
    if (date){
      return _moment(date).format(dateTimeFormat);
    }
    return '';
  }

  getCategory(category) {
    if (category === 'other'){
      return 'Other Costs';
    }
    if (category === 'staff'){
      return 'Staff And Benefits';
    }
    if (category === 'operating'){
      return 'Operating Costs';
    }
    if (category === 'admin'){
      return 'Administrative Costs';
    }
  }

  removeOne(elem) {
    const dialogRef = this.dialog.open(RemoveCostsComponent);
    dialogRef.componentInstance.onRemove.subscribe(() => {
      this.removeRecords([elem]);
      dialogRef.close();
    });
  }

  removeSelected() {
    const data = [];
    this.dataSource.map(el => {
      if (el.isSelected){
        data.push(el);
      }
    });
    const dialogRef = this.dialog.open(RemoveCostsComponent);
    dialogRef.componentInstance.onRemove.subscribe(() => {
      this.removeRecords(data);
      dialogRef.close();
    });
  }

  removeRecords(data) {
    this.expensesService.removeExpenses(data).subscribe(
      res => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
          this.toastr.success(text);
        });
        this.getCostsList(this.costListParams);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  changeOneCheckBox(ev, elem) {
    elem.isSelected = ev.checked;
  }

  evenOneSelected(){
     return this.dataSource.some(el => {
      return el.isSelected === true;
    });
  }

  changeGlobCheckbox(ev) {
    this.dataSource.map(el => {
      el.isSelected = ev.checked;
    });
  }

  resetFilters() {
    this.costListParams.filters = {
      sum: '',
      math_op: '=',
      payment_date: '',
      sub_category: []
    };
    this.getCostsList(this.costListParams);
  }
}
