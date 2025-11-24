import { Routes } from '@angular/router';
import { SalePageComponent } from './pages/sale-page/sale-page';
import { UserPageComponent } from './pages/user-page/user-page';
import { ClientsTablePageComponent } from './pages/clients-table-page/clients-table-page';

export const MAINTENANCE_ROUTES: Routes = [
  {path: 'clients-table', component: ClientsTablePageComponent},
  {path: 'sale', component: SalePageComponent},
  {path: 'user', component: UserPageComponent}
];
