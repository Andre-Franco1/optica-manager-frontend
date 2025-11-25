import { Routes } from '@angular/router';
import { SalePageComponent } from './pages/sale-page/sale-page';
import { UserPageComponent } from './pages/user-page/user-page';
import { ClientsTablePageComponent } from './pages/clients-table-page/clients-table-page';
import { ClientFormPageComponent } from './pages/client-form-page/client-form-page';

export const MAINTENANCE_ROUTES: Routes = [
  {path: 'clients-table', component: ClientsTablePageComponent},
  {path: 'client-form', component: ClientFormPageComponent},
  {path: 'client-form/:id', component: ClientFormPageComponent},
  {path: 'sale', component: SalePageComponent},
  {path: 'user', component: UserPageComponent}
];
