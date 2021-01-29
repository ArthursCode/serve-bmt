import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SettingsService} from './settings.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {ChangeSettingsComponent} from './modals/change-settings/change-settings.component';
import {createEmptyFile} from '../../common/functions/file-operations';
import {drawImage} from '../../common/functions/image-operations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  settingsForm: any;
  user: any;
  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userSettingsService: SettingsService,
    private translate: TranslateService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initSettingsForm();
    this.getUserSettings();
  }

  initSettingsForm() {
    this.settingsForm = this.fb.group({
      logoUrl: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getUserSettings() {
    this.userSettingsService.getUserSettings().subscribe(
      res => {
        this.user = res.data;
        if (res.data.logoUrl){
          this.files = [createEmptyFile('logo')];
          drawImage('settingsImg', res.data.logoUrl);
        }
        this.settingsForm.patchValue(res.data);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  openSaveSettingDialog() {
    this.dialog.open(ChangeSettingsComponent, {
      data: this.settingsForm.value
    });
  }

  onSelect(event) {
    if (!event.addedFiles[0]) {
      return;
    }
    this.files = [event.addedFiles[0]];
    const formData = new FormData();
    formData.append('logo', this.files[0]);
    this.userSettingsService.postUploadLogo(formData).subscribe(
      res => {
        this.settingsForm.get('logoUrl').setValue(res.logoUrl);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.settingsForm.get('logoUrl').setValue('');
  }

}
