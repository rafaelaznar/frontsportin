import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { TipousuarioPlist } from './component/tipousuario/tipousuario-plist/tipousuario-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'tipousuario/plist', component: TipousuarioPlist},
];
