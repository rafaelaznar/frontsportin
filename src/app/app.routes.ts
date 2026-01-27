import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { TemporadaPlist } from './component/temporada-plist/temporada-plist';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'temporada', component: TemporadaPlist },
];
