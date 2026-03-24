import { Component, signal } from '@angular/core';
import { ArticuloPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/articulo-plist-teamadmin-unrouted';

@Component({
  selector: 'app-articulo-plist-teamadmin-routed',
  imports: [ArticuloPlistTeamAdminUnrouted],
  templateUrl: './articulo-plist-teamadmin-routed.html',
  styleUrls: ['./articulo-plist-teamadmin-routed.css'],
  standalone: true,
})
export class ArticuloPlistTeamAdminRouted {
  tipoarticulo = signal<number>(0);
}

