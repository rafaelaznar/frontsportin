import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { UsuarioPlist } from './component/usuario/usuario-plist/usuario-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'usuario/plist', component: UsuarioPlist },
];
