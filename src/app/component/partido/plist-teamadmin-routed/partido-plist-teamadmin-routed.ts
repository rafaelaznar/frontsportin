import { Component } from '@angular/core';
import { PartidoPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/partido-plist-teamadmin-unrouted';

@Component({
  selector: 'app-partido-plist-teamadmin-routed',
  imports: [PartidoPlistTeamAdminUnrouted],
  templateUrl: './partido-plist-teamadmin-routed.html',
  styleUrls: ['./partido-plist-teamadmin-routed.css'],
  standalone: true,
})
export class PartidoPlistTeamAdminRouted {}
