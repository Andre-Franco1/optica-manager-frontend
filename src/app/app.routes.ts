import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
    {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.routes').then(m => m.LOGIN_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/home/home.routes').then(m => m.HOME_ROUTES),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/maintenance/maintenance.routes').then(m => m.MAINTENANCE_ROUTES),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/inventory/inventory.routes').then(m => m.INVENTORY_ROUTES),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/history/history.routes').then(m => m.HISTORY_ROUTES),
        canActivate: [AuthGuard]
    }
];
