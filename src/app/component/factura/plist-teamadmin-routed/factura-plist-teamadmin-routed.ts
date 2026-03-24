import { Component } from '@angular/core';
import { FacturaPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/factura-plist-teamadmin-unrouted';

@Component({
  selector: 'app-factura-plist-teamadmin-routed',
  imports: [FacturaPlistTeamAdminUnrouted],
  templateUrl: './factura-plist-teamadmin-routed.html',
  styleUrls: ['./factura-plist-teamadmin-routed.css'],
  standalone: true,
})
export class FacturaPlistTeamAdminRouted {}
