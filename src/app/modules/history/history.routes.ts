import { Routes } from '@angular/router';
import { ClientHistoryComponent } from './pages/client-history/client-history';
import { SaleHistoryComponent } from './pages/sale-history/sale-history';

export const HISTORY_ROUTES: Routes = [
  {path: 'client-history', component: ClientHistoryComponent},
  {path: 'sale-history', component: SaleHistoryComponent}
];
