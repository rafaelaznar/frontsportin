import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { LigaPlist } from './component/liga-plist/liga-plist';

export const routes: Routes = [
    { path: '', component: Home },
    {path: 'liga', component: LigaPlist },
];
