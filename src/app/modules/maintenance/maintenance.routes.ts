import { Routes } from '@angular/router';
import { ClientPageComponent } from './pages/client-page/client-page';
import { SalePageComponent } from './pages/sale-page/sale-page';
import { UserPageComponent } from './pages/user-page/user-page';

export const MAINTENANCE_ROUTES: Routes = [
  {path: 'client', component: ClientPageComponent},
  {path: 'sale', component: SalePageComponent},
  {path: 'user', component: UserPageComponent}
];
