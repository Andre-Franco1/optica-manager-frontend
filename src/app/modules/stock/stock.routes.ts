import { Routes } from '@angular/router';
import { FrameTablePageComponent } from './pages/frame-table-page/frame-table-page';
import { FrameFormPageComponent } from './pages/frame-form-page/frame-form-page';
import { LensTablePageComponent } from './pages/lens-table-page/lens-table-page';
import { LensFormPageComponent } from './pages/lens-form-page/lens-form-page';

export const STOCK_ROUTES: Routes = [
  {path: 'frames-table', component: FrameTablePageComponent},
  {path: 'frame-form', component: FrameFormPageComponent},
  {path: 'frame-form/:id', component: FrameFormPageComponent},
  {path: 'lenses-table', component: LensTablePageComponent},
  {path: 'lens-form', component: LensFormPageComponent},
  {path: 'lens-form/:id', component: LensFormPageComponent}
];
