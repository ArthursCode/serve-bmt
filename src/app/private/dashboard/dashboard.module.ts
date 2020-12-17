import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared.module';
import {ChartsModule} from 'ng2-charts';
import {DashboardComponent} from './dashboard.component';
import {AppRoutingModule} from '../../app-routing.module';
import {DashboardService} from './dashboard.service';
import {ChartPieComponent} from './charts/chartjs-pie.component';
import {ChartBarComponent} from './charts/chartjs-bar.component';
import {ChartModule} from 'angular2-chartjs';
import {Ng9OdometerModule} from 'ng9-odometer';


@NgModule({
    declarations: [
        DashboardComponent,
        ChartPieComponent,
        ChartBarComponent
    ],
    entryComponents: [],
    imports: [
        SharedModule,
        ChartsModule,
        ChartModule,
        Ng9OdometerModule.forRoot(),
        AppRoutingModule
    ],
    exports: [
        DashboardComponent
    ],
    providers: [DashboardService]
})
export class DashboardModule { }
