import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { UsuarioPlist } from './component/usuario/usuario-plist/usuario-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'usuario', component: UsuarioPlist },
    { path: 'usuario/tipousuario/:tipousuario', component: UsuarioPlist },
    { path: 'usuario/rol/:rol', component: UsuarioPlist },
    { path: 'usuario/club/:club', component: UsuarioPlist },
];
