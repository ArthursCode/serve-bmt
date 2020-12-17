import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import * as _moment from 'moment';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {dateFormat, infoDateFormat} from "../../../../common/constants/constants";
import {DailyCostsService} from "../daily-costs.service";
import {SaveCostsComponent} from "../modals/save-costs/save-costs.component";
import {MatDialog} from "@angular/material/dialog";

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
  selector: 'app-admin-costs',
  templateUrl: './admin-costs.component.html',
  styleUrls: ['./admin-costs.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AdminCostsComponent implements OnInit {
  adminForm: any;
  searchParams = {
    category: 'admin'
  };

  searchParamsDaily = {
    category: 'admin',
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
    this.initAdminForm([]);
    this.getCosts();
  }

  initAdminForm(data) {
    this.adminForm = this.fb.group({
      advertising: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'advertising') ? this.getDateByCategory(data, 'advertising'): new Date()],
        sum: [this.getSumByCategory(data, 'advertising') ? this.getSumByCategory(data, 'advertising'): ''],
        category: 'admin',
        sub_category: 'advertising',
        daily_info: ''
      }),
      subscriptions: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'subscriptions') ? this.getDateByCategory(data, 'subscriptions'): new Date()],
        sum: [this.getSumByCategory(data, 'subscriptions') ? this.getSumByCategory(data, 'subscriptions'): ''],
        category: 'admin',
        sub_category: 'subscriptions',
        daily_info: ''
      }),
      accounting: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'accounting') ? this.getDateByCategory(data, 'accounting'): new Date()],
        sum: [this.getSumByCategory(data, 'accounting') ? this.getSumByCategory(data, 'accounting'): ''],
        category: 'admin',
        sub_category: 'accounting',
        daily_info: ''
      }),
      repairs: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'repairs') ? this.getDateByCategory(data, 'repairs'): new Date()],
        sum: [this.getSumByCategory(data, 'repairs') ? this.getSumByCategory(data, 'repairs'): ''],
        category: 'admin',
        sub_category: 'repairs',
        daily_info: ''
      }),
      supplies: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'supplies') ? this.getDateByCategory(data, 'supplies'): new Date()],
        sum: [this.getSumByCategory(data, 'supplies') ? this.getSumByCategory(data, 'supplies'): ''],
        category: 'admin',
        sub_category: 'supplies',
        daily_info: ''
      })
    });
  }

  getSumByCategory(data, category) {
    if(data.length>0) {
      const _obj = data.find(obj => {
        return obj.sub_category === category;
      });
      return _obj? _obj.sum: null;
    }
  }

  getDateByCategory(data, category) {
    if(data.length > 0) {
      const _obj = data.find(obj => {
        return obj.sub_category === category;
      });
      return _obj? _moment(_obj.payment_date, 'MM-DD-YYYY').toDate() : null;
    }
  }

  saveChanges(category) {
    let reqObj = {
      type: this.searchParams.category,
      items: []
    };
    if(category === 'all'){
      reqObj.items = Object.values(this.adminForm.value);
    } else{
      reqObj.items = [this.adminForm.controls[category].value];
    }
    reqObj.items.map(el => {
      delete el['daily_info'];
      el['payment_date'] = _moment(el['payment_date'], 'MM-DD-YYYY').format(dateFormat);
    });

    let dialogRef = this.dialog.open(SaveCostsComponent);
    dialogRef.componentInstance.onSave.subscribe(() => {
      this.saveRecords(reqObj);
      dialogRef.close();
    });
  }

  saveRecords(reqObj) {
    this.costsService.postChangeExpenses(reqObj)
      .subscribe(
        res => {
          this.translate.get(res.message || 'SUCCESS').subscribe((text:string) => {
            this.toastr.success(text);
          });
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
            this.toastr.error(text);
          });
        }
      )
  }

  getCosts() {
    this.costsService.getExpenses(this.searchParams).subscribe(
      res => {
        this.initAdminForm(res.data);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  changeDate(category) {
    this.searchParamsDaily.payment_date = _moment(this.adminForm.value[category].payment_date).format(dateFormat);
    this.searchParamsDaily.sub_category = category;
    this.costsService.getExpensesDaily(this.searchParamsDaily).subscribe(
      res => {
        this.adminForm.controls[category].get('sum').setValue(res.data ? res.data.sum : '');
        this.adminForm.controls[category].get('daily_info').setValue(res.data && res.data.sum? `Payed $${res.data.sum || 0} on ${_moment(res.data.payment_date, 'MM-DD-YYYY').format(infoDateFormat)}`: '');
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
          this.toastr.error(text);
        });
      }
    );
  }
}
