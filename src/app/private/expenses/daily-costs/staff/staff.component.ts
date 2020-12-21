import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import * as _moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {dateFormat, infoDateFormat} from '../../../../common/constants/constants';
import {DailyCostsService} from '../daily-costs.service';
import {MatDialog} from '@angular/material/dialog';
import {SaveCostsComponent} from '../modals/save-costs/save-costs.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class StaffComponent implements OnInit {
  staffForm: any;
  searchParams = {
    category: 'staff'
  };

  searchParamsDaily = {
    category: 'staff',
    sub_category: '',
    payment_date: ''
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService,
    private costsService: DailyCostsService
  ) { }

  ngOnInit() {
    this.initStaffForm([]);
    this.getCosts();
  }

  initStaffForm(data) {

    this.staffForm = this.fb.group({
      salaries: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'salaries') ? this.getDateByCategory(data, 'salaries') : new Date()],
        sum: [this.getSumByCategory(data, 'salaries') ? this.getSumByCategory(data, 'salaries') : ''],
        category: 'staff',
        sub_category: 'salaries',
        daily_info: ''
      }),
      taxes: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'taxes') ? this.getDateByCategory(data, 'taxes') : new Date()],
        sum: [this.getSumByCategory(data, 'taxes') ? this.getSumByCategory(data, 'taxes') : ''],
        category: 'staff',
        sub_category: 'taxes',
        daily_info: ''
      }),
      benefits: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'benefits') ? this.getDateByCategory(data, 'benefits') : new Date()],
        sum: [this.getSumByCategory(data, 'benefits') ? this.getSumByCategory(data, 'benefits') : ''],
        category: 'staff',
        sub_category: 'benefits',
        daily_info: ''
      }),
      insurances: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'insurances') ? this.getDateByCategory(data, 'insurances') : new Date()],
        sum: [this.getSumByCategory(data, 'insurances') ? this.getSumByCategory(data, 'insurances') : ''],
        category: 'staff',
        sub_category: 'insurances',
        daily_info: ''
      })
    });

  }

  getSumByCategory(data, category) {
    if (data.length > 0) {
      const _OBJ = data.find(obj => {
        return obj.sub_category === category;
      });
      return _OBJ ? _OBJ.sum : null;
    }
  }

  getDateByCategory(data, category) {
    if (data.length > 0) {
      const _OBJ = data.find(obj => {
        return obj.sub_category === category;
      });
      return _OBJ ? _moment(_OBJ.payment_date, 'MM-DD-YYYY').toDate() : null;
    }
  }

  saveChanges(category) {
    const reqObj = {
      type: this.searchParams.category,
      items: []
    };
    if (category === 'all'){
      reqObj.items = Object.values(this.staffForm.value);
    } else{
      reqObj.items = [this.staffForm.controls[category].value];
    }
    reqObj.items.map(el => {
      delete el.daily_info;
      el.payment_date = _moment(el.payment_date, 'MM-DD-YYYY').format(dateFormat);
    });

    const dialogRef = this.dialog.open(SaveCostsComponent);
    dialogRef.componentInstance.onSave.subscribe(() => {
      this.saveRecords(reqObj);
      dialogRef.close();
    });
  }

  saveRecords(reqObj) {
    this.costsService.postChangeExpenses(reqObj)
      .subscribe(
        res => {
          this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
            this.toastr.success(text);
          });
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
            this.toastr.error(text);
          });
        }
      );
  }

  getCosts() {
    this.costsService.getExpenses(this.searchParams).subscribe(
      res => {
        this.initStaffForm(res.data);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  changeDate(category) {
    this.searchParamsDaily.payment_date = _moment(this.staffForm.value[category].payment_date).format(dateFormat);
    this.searchParamsDaily.sub_category = category;
    this.costsService.getExpensesDaily(this.searchParamsDaily).subscribe(
      res => {
        this.staffForm.controls[category].get('sum').setValue(res.data ? res.data.sum : '');
        this.staffForm.controls[category].get('daily_info').setValue(res.data && res.data.sum ? `Payed $${res.data.sum || 0} on ${_moment(res.data.payment_date, 'MM-DD-YYYY').format(infoDateFormat)}` : '');
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }
}
