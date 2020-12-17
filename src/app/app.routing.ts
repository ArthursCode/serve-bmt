import {Routes} from '@angular/router';
import {publicRoutes} from './public/public.routing.module';
import {privateRoutes} from './private/private.routing.module';

export const routes: Routes = [
  ...publicRoutes,
  ...privateRoutes,
];
