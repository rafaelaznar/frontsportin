import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { TipoarticuloPlist } from './component/tipoarticulo-plist/tipoarticulo-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'tipoarticulo', component: TipoarticuloPlist }
];
