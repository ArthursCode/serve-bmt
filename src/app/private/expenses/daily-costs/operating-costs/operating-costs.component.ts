import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {DailyCostsService} from "../daily-costs.service";
import * as _moment from "moment";
import {dateFormat, infoDateFormat} from "../../../../common/constants/constants";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MY_FORMATS} from "../staff/staff.component";
import {SaveCostsComponent} from "../modals/save-costs/save-costs.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-operating-costs',
  templateUrl: './operating-costs.component.html',
  styleUrls: ['./operating-costs.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class OperatingCostsComponent implements OnInit {
  operatingForm: any;
  searchParams = {
    category: 'operating',
  };

  searchParamsDaily = {
    category: 'operating',
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
    this.initOperatingForm([]);
    this.getCosts();
  }

  initOperatingForm(data) {

    this.operatingForm = this.fb.group({
      utilities: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'utilities') ? this.getDateByCategory(data, 'utilities'): new Date()],
        sum: [this.getSumByCategory(data, 'utilities') ? this.getSumByCategory(data, 'utilities'): ''],
        category: 'operating',
        sub_category: 'utilities',
        daily_info: ''
      }),
      building: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'building') ? this.getDateByCategory(data, 'building'): new Date()],
        sum: [this.getSumByCategory(data, 'building') ? this.getSumByCategory(data, 'building'): ''],
        category: 'operating',
        sub_category: 'building',
        daily_info: ''
      }),
      equipment_leases: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'equipment_leases') ? this.getDateByCategory(data, 'equipment_leases'): new Date()],
        sum: [this.getSumByCategory(data, 'equipment_leases') ? this.getSumByCategory(data, 'equipment_leases'): ''],
        category: 'operating',
        sub_category: 'equipment_leases',
        daily_info: ''
      }),
      equipment_expenses: this.fb.group({
        payment_date: [this.getDateByCategory(data, 'equipment_expenses') ? this.getDateByCategory(data, 'equipment_expenses'): new Date()],
        sum: [this.getSumByCategory(data, 'equipment_expenses') ? this.getSumByCategory(data, 'equipment_expenses'): ''],
        category: 'operating',
        sub_category: 'equipment_expenses',
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
      reqObj.items = Object.values(this.operatingForm.value);
    } else{
      reqObj.items = [this.operatingForm.controls[category].value];
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
        this.initOperatingForm(res.data);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  changeDate(category) {
    this.searchParamsDaily.payment_date = _moment(this.operatingForm.value[category].payment_date).format(dateFormat);
    this.searchParamsDaily.sub_category = category;
    this.costsService.getExpensesDaily(this.searchParamsDaily).subscribe(
      res => {
        this.operatingForm.controls[category].get('sum').setValue(res.data ? res.data.sum : '');
        this.operatingForm.controls[category].get('daily_info').setValue(res.data && res.data.sum? `Payed $${res.data.sum || 0} on ${_moment(res.data.payment_date, 'MM-DD-YYYY').format(infoDateFormat)}`: '');
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
          this.toastr.error(text);
        });
      }
    );
  }
}
