import { NgModule } from '@angular/core';
import {SettingsComponent} from "./settings.component";
import {SharedModule} from "../../shared.module";
import { ChangeSettingsComponent } from './modals/change-settings/change-settings.component';
import {NgxDropzoneModule} from "ngx-dropzone";


@NgModule({
  declarations: [
    SettingsComponent,
    ChangeSettingsComponent
  ],
  entryComponents: [ChangeSettingsComponent],
  imports: [
    SharedModule,
    NgxDropzoneModule
  ]
})
export class SettingsModule { }
