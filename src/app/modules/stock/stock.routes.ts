import { Routes } from '@angular/router';
import { FrameTablePageComponent } from './pages/frame-table-page/frame-table-page';
import { FrameFormPageComponent } from './pages/frame-form-page/frame-form-page';

export const STOCK_ROUTES: Routes = [
  {path: 'frames-table', component: FrameTablePageComponent},
  {path: 'frame-form', component: FrameFormPageComponent},
  {path: 'frame-form/:id', component: FrameFormPageComponent}
];
