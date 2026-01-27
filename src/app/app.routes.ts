import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { PlistEquipo } from './component/shared/plist-equipo/plist-equipo';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'equipo', component: PlistEquipo },
];
