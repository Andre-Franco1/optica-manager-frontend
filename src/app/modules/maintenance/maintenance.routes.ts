import { Routes } from '@angular/router';
import { UserPageComponent } from './pages/user-page/user-page';
import { ClientsTablePageComponent } from './pages/clients-table-page/clients-table-page';
import { ClientFormPageComponent } from './pages/client-form-page/client-form-page';
import { SalesTablePageComponent } from './pages/sales-table-page/sales-table-page';
import { SaleFormPageComponent } from './pages/sale-form-page/sale-form-page';

export const MAINTENANCE_ROUTES: Routes = [
  {path: 'clients-table', component: ClientsTablePageComponent},
  {path: 'client-form', component: ClientFormPageComponent},
  {path: 'client-form/:id', component: ClientFormPageComponent},
  {path: 'sales-table', component: SalesTablePageComponent},
  {path: 'sale-form', component: SaleFormPageComponent},
  {path: 'user', component: UserPageComponent}
];
