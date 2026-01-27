import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { AdminPlist } from './component/categoria/categoria-plist/categoria-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'categoria', component: AdminPlist}
];
