import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ExpensesService} from '../expenses.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import * as _moment from 'moment';
import {
  categoryAllItems,
  dateTimeFormat,
  getCategoryName,
  getSubCategoryName,
  tableDateFormat
} from '../../../common/constants/constants';
import {RemoveBinCostsComponent} from './modals/remove-bin-costs/remove-bin-costs.component';
import {MatDialog} from '@angular/material/dialog';
import {RestoreBinCostsComponent} from './modals/restore-bin-costs/restore-bin-costs.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../daily-costs/staff/staff.component';


@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class BinComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['checkbox', 'category', 'payment_date', 'sub_category', 'sum', 'time', 'actions'];
  dataSource = [];
  allChecked = false;
  zero = 0;
  isLoading = true;

  mathOps = [
    {key: '>='},
    {key: '='},
    {key: '<='}
  ];

  categoryAll = categoryAllItems;

  length = 0;
  total = 0;

  costListParams = {
    current: 1,
    per_page: 10,
    filters: {
      sum: '',
      math_op: '=',
      start: '',
      end: '',
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
    this.expensesService.getBinExpensesList(this.costListParams).subscribe(
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
    return getCategoryName[category];
  }
  getSubCategory(subCategory) {
    return getSubCategoryName[subCategory] || subCategory;
  }

  removeOne(elem) {
    const dialogRef = this.dialog.open(RemoveBinCostsComponent);
    dialogRef.componentInstance.onRemove.subscribe(() => {
      this.removeRecords([elem]);
      dialogRef.close();
    });
  }

  restoreOne(elem) {
    const dialogRef = this.dialog.open(RestoreBinCostsComponent);
    dialogRef.componentInstance.onRestore.subscribe(() => {
      this.restoreRecords([elem]);
      dialogRef.close();
    });
  }

  changeSelected(action) {
    const data = [];
    this.dataSource.map(el => {
      if (el.isSelected){
        data.push(el);
      }
    });
    if (action === 'remove'){
      const dialogRef = this.dialog.open(RemoveBinCostsComponent);
      dialogRef.componentInstance.onRemove.subscribe(() => {
        this.removeRecords(data);
        dialogRef.close();
      });
    }
    if (action === 'restore'){
      const dialogRef = this.dialog.open(RestoreBinCostsComponent);
      dialogRef.componentInstance.onRestore.subscribe(() => {
        this.restoreRecords(data);
        dialogRef.close();
      });
    }
  }

  removeRecords(data) {
    this.expensesService.removeBinExpenses(data).subscribe(
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

  restoreRecords(data) {
    this.expensesService.restoreBinExpenses(data).subscribe(
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
      start: '',
      end: '',
      sub_category: []
    };
    this.getCostsList(this.costListParams);
  }

  searchRec() {
    this.costListParams.current = 1;
    this.getCostsList(this.costListParams);
  }
}
