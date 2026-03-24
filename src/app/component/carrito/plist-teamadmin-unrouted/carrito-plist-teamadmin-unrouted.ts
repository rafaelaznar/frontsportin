import { Component } from '@angular/core';
import { CarritoPlistAdminRouted } from '../plist-admin-routed/carrito-plist';

@Component({
  selector: 'app-carrito-plist-teamadmin-unrouted',
  imports: [CarritoPlistAdminRouted],
  templateUrl: './carrito-plist-teamadmin-unrouted.html',
  styleUrl: './carrito-plist-teamadmin-unrouted.css',
  standalone: true,
})
export class CarritoPlistTeamAdminUnrouted {}
