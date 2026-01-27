import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { ClubPlist } from './component/club/club-plist/club-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'club/plist', component: ClubPlist },
];
