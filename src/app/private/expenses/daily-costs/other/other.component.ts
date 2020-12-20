import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {DailyCostsService} from '../daily-costs.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../staff/staff.component';
import * as _moment from 'moment';
import {dateFormat, infoDateFormat} from '../../../../common/constants/constants';
import {SaveCostsComponent} from '../modals/save-costs/save-costs.component';
import {MatDialog} from '@angular/material/dialog';
import {scrollBottom} from '../../../../common/functions/scrolling';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class OtherComponent implements OnInit {
  otherForm: FormGroup;
  items: FormArray;
  saved = false;

  searchParams = {
    category: 'other',
  };

  searchParamsDaily = {
    category: 'other',
    sub_category: '',
    payment_date: ''
  };

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private translate: TranslateService,
              private costsService: DailyCostsService) { }

  ngOnInit() {
    this.initOtherForm([]);
    this.getCosts();
  }

  initOtherForm(list) {
    this.otherForm = this.fb.group({
      items: list ? this.fb.array(this.mapCosts(list)) : this.fb.array([])
    });
  }

  mapCosts(list) {
    return list.map((item) => {
      return this.createItem(item);
    });
  }

  createItem(item): FormGroup {
    return this.fb.group({
      payment_date: this.getDate(item.payment_date) || new Date(),
      sum: item.sum || '',
      category: 'other',
      sub_category: item.sub_category || '',
      daily_info: ''
    });
  }

  getDate(data) {
    if (data) {
      return _moment(data, 'MM-DD-YYYY').toDate();
    }
  }

  addItem(container): void {
    this.saved = false;
    this.items = this.otherForm.get('items') as FormArray;
    this.items.push(this.createItem({}));
    scrollBottom(container);
  }

  removeItem(idx): void {
    this.items = this.otherForm.get('items') as FormArray;
    this.items.removeAt(idx);
  }

  changeDate(item) {
    this.searchParamsDaily.payment_date = _moment(item.value.payment_date).format(dateFormat);
    this.searchParamsDaily.sub_category = item.value.sub_category;
    this.costsService.getExpensesDaily(this.searchParamsDaily).subscribe(
      res => {
        item.get('daily_info').setValue(res.data && res.data.sum ? `Payed $${res.data.sum || 0} on ${_moment(res.data.payment_date, 'MM-DD-YYYY').format(infoDateFormat)}` : '');
        item.get('sum').setValue( res.data ? res.data.sum : '');
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  saveChanges() {
    this.saved = true;
    if (!this.otherForm.valid){
      return;
    }
    const reqObj = {
      type: this.searchParams.category,
      items: this.otherForm.value.items
    };
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
        this.initOtherForm(res.data);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

}
