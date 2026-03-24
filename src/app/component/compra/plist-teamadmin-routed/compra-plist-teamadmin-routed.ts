import { Component } from '@angular/core';
import { CompraPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/compra-plist-teamadmin-unrouted';

@Component({
  selector: 'app-compra-plist-teamadmin-routed',
  imports: [CompraPlistTeamAdminUnrouted],
  templateUrl: './compra-plist-teamadmin-routed.html',
  styleUrls: ['./compra-plist-teamadmin-routed.css'],
  standalone: true,
})
export class CompraPlistTeamAdminRouted {}
