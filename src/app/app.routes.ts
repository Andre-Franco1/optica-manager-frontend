import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./modules/home/home.routes').then(m => m.HOME_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/maintenance/maintenance.routes').then(m => m.MAINTENANCE_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/inventory/inventory.routes').then(m => m.INVENTORY_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/history/history.routes').then(m => m.HISTORY_ROUTES),
    }
];
