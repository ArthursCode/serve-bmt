import {Routes} from '@angular/router';
import {StaffComponent} from "./daily-costs/staff/staff.component";
import {OperatingCostsComponent} from "./daily-costs/operating-costs/operating-costs.component";
import {AdminCostsComponent} from "./daily-costs/admin-costs/admin-costs.component";
import {OtherComponent} from "./daily-costs/other/other.component";
import {DailyCostsComponent} from "./daily-costs/daily-costs.component";
import {BinComponent} from "./bin/bin.component";
import {ActionsComponent} from "./actions/actions.component";



export const expensesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'daily-costs',
    pathMatch: 'full',
  },
  {
    path: 'daily-costs',
    component: DailyCostsComponent,
    children: [
      {
        path: '',
        redirectTo: 'staff',
        pathMatch: 'full'
      },
      {
        path: 'staff',
        component: StaffComponent
      },
      {
        path: 'operating-costs',
        component: OperatingCostsComponent
      },
      {
        path: 'administrative-costs',
        component: AdminCostsComponent
      },
      {
        path: 'other',
        component: OtherComponent
      },
    ]
  },
  {
    path: 'actions',
    component: ActionsComponent
  },
  {
    path: 'bin',
    component: BinComponent
  }
];
