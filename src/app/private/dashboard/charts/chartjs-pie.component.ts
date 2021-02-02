import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DashboardService} from '../dashboard.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-chart-pie',
  template: `
    <div class="chart-heading">Expenses summary</div>
    <ng-select class="period-select mb-4"
               [items]="periodsPie"
               [clearable]="false"
               [searchable]="false"
               bindLabel="label"
               (change)="switchPieChart()"
               [(ngModel)]="selectedPiePeriod">
    </ng-select>
    <chart class="canvas-height" borderWidth="10" type="doughnut" [data]="data" [options]="options"></chart>
  `,
  styleUrls: ['./charts.component.scss']
})
export class ChartPieComponent implements OnInit {
  data: any;
  options: any;

  searchParams = {
    period: ''
  };

  periodsPie = [
    {key: 'all_time', label: 'All time'},
    {key: 'this_month', label:  'This month'},
    {key: 'this_year', label:  'This year'},
    {key: 'last_year', label: 'Last year'}
  ];
  selectedPiePeriod: any;

  constructor(private toastr: ToastrService,
              private dashboardService: DashboardService,
              private translate: TranslateService) {

    this.data = {
      labels: ['Staff & Benefits', 'Operating', 'Administrative', 'Other'],
      datasets: [{
        data: [],
        backgroundColor: ['#ffa1b5', '#7cbde9', '#ffe29a', '#f1f2f4'],
      }],
    };
    this.options = {
      cutoutPercentage: 75,
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
      legend: {
        labels: {
          fontColor: '#808080',
        },
      },
    };
  }

  ngOnInit() {
    this.selectedPiePeriod = this.periodsPie[0];
    this.switchPieChart();
  }

  getChartPie() {
    this.dashboardService.getChartPie(this.searchParams).subscribe(
      res => {
        if (res.data){
          this.data.datasets[0].data = res.data;
          this.data = Object.create(this.data);
        }
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  switchPieChart() {
    this.searchParams.period = this.selectedPiePeriod.key;
    this.getChartPie();
  }
}
