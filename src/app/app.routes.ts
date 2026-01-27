import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { JugadorPlisComponent } from './component/shared/jugador/jugadorPlist/jugador-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'jugador', component: JugadorPlisComponent },
];
