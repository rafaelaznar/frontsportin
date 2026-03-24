import { Component } from '@angular/core';
import { PagoPlistComponent } from '../plist-admin-routed/pago-plist';

@Component({
  selector: 'app-pago-plist-teamadmin-unrouted',
  imports: [PagoPlistComponent],
  templateUrl: './pago-plist-teamadmin-unrouted.html',
  styleUrl: './pago-plist-teamadmin-unrouted.css',
  standalone: true,
})
export class PagoPlistTeamAdminUnrouted {}
