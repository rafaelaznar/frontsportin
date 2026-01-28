import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { FacturaPlist } from './component/factura-plist/factura-plist';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'factura', component: FacturaPlist }
];
