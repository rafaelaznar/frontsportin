import { Component } from '@angular/core';
import { PagoPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/pago-plist-teamadmin-unrouted';

@Component({
  selector: 'app-pago-plist-teamadmin-routed',
  imports: [PagoPlistTeamAdminUnrouted],
  templateUrl: './pago-plist-teamadmin-routed.html',
  styleUrls: ['./pago-plist-teamadmin-routed.css'],
  standalone: true,
})
export class PagoPlistTeamAdminRouted {}
