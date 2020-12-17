import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {SettingsService} from "../../settings.service";
import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GlobalService} from "../../../../common/global/global.service";

@Component({
  selector: 'app-change-settings-dialog',
  templateUrl: './change-settings.component.html',
  styleUrls: ['./change-settings.component.scss']
})
export class ChangeSettingsComponent implements OnInit {

  userData: any;

  constructor(
    private toastr: ToastrService,
    private userSettingsService: SettingsService,
    private translate: TranslateService,
    public globalService: GlobalService,
    public dialogRef: MatDialogRef<ChangeSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.globalService.userData.subscribe((data) => {
      this.userData = data;
    });
  }

  saveUserSettings() {
    this.userSettingsService.postChangeUserSettings(this.data)
      .subscribe(
        res => {
          this.translate.get(res.message || 'SUCCESS').subscribe((text:string) => {
            this.toastr.success(text);
          });
          this.globalService.setUserData({
            ...this.userData,
            name: this.data.name,
            logoUrl: this.data.logoUrl,
            company: this.data.company
          });

          this.dialogRef.close();
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
            this.toastr.error(text);
          });
        }
      )
  }

}
