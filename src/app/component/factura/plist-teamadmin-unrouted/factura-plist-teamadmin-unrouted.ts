import { Component } from '@angular/core';
import { FacturaPlistAdminUnrouted } from '../plist-admin-unrouted/factura-plist';

@Component({
  selector: 'app-factura-plist-teamadmin-unrouted',
  imports: [FacturaPlistAdminUnrouted],
  templateUrl: './factura-plist-teamadmin-unrouted.html',
  styleUrl: './factura-plist-teamadmin-unrouted.css',
  standalone: true,
})
export class FacturaPlistTeamAdminUnrouted {}
