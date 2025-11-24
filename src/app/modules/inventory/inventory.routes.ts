import { Routes } from '@angular/router';
import { FramePageComponent } from './pages/frame-page/frame-page';
import { LensPageComponent } from './pages/lens-page/lens-page';

export const INVENTORY_ROUTES: Routes = [
  {path: 'frame', component: FramePageComponent},
  {path: 'lens', component: LensPageComponent}
];
