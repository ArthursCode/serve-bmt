import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-chart-bar',
  template: `
    <div class="chart-heading">Costs chart</div>
    <ng-select class="period-select mb-4"
               [items]="periodsBar"
               [clearable]="false"
               [searchable]="false"
               bindLabel="label"
               (change)="switchBarChart()"
               [(ngModel)]="selectedBarPeriod">
    </ng-select>
    <chart class="canvas-height" type="bar" [data]="data" [options]="options"></chart>
  `,
  styleUrls: ['./charts.component.scss']
})
export class ChartBarComponent implements OnInit {

  data: any;
  options: any;

  searchParams = {
    period: ''
  };

  periodsBar = [
    {key: 'all_time', label: 'All time'},
    {key: 'this_year', label:  'This year'},
    {key: 'last_year', label: 'Last year'},
  ];

  selectedBarPeriod: any;

  constructor(private dashboardService: DashboardService,
              private translate: TranslateService,
              private toastr: ToastrService) {
    this.data = {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Staff & Benefits',
          backgroundColor: '#ffa1b5',
        },
        {
          data: [],
          label: 'Operating',
          backgroundColor: '#7cbde9',
        },
        {
          data: [],
          label: 'Administrative',
          backgroundColor: '#ffe29a',
        },
        {
          data: [],
          label: 'Other',
          backgroundColor: '#f1f2f4',
        }
      ]
    };
    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        labels: {
          fontColor: '#808080',
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: '#808080',
            },
            ticks: {
              fontColor: '#808080',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: '#808080',
            },
            ticks: {
              fontColor: '#808080',
            },
          },
        ],
      },
    };
  }

  ngOnInit() {
    this.selectedBarPeriod = this.periodsBar[0];
    this.switchBarChart();
  }

  switchBarChart() {
    this.searchParams.period = this.selectedBarPeriod.key;
    this.getChartBar();
  }

  getChartBar() {
    this.dashboardService.getChartBar(this.searchParams).subscribe(
      res => {
        if(res.data){
          this.data.labels = res.labels;
          for(let i=0; i< this.data.datasets.length;i++) {
            this.data.datasets[i].data = res.data[i];
          }
          this.data = Object.create(this.data);
        }
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
          this.toastr.error(text);
        });
      }
    );
  }
}
