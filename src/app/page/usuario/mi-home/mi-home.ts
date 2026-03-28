import { Component } from '@angular/core';
import { UserDashboardComponent } from '../../../component/shared/user-dashboard/user-dashboard';

@Component({
  selector: 'app-mi-home-page',
  standalone: true,
  imports: [UserDashboardComponent],
  templateUrl: './mi-home.html',
  styleUrl: './mi-home.css',
})
export class MiHomePage {}
