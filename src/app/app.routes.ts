import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { NoticiaPlist } from './component/noticia/noticia-plist/noticia-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'noticia', component: NoticiaPlist },
];
