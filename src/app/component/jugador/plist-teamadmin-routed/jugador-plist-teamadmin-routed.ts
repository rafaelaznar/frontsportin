import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/jugador-plist-teamadmin-unrouted';

@Component({
  standalone: true,
  selector: 'app-jugador-plist-teamadmin-routed',
  templateUrl: './jugador-plist-teamadmin-routed.html',
  styleUrls: ['./jugador-plist-teamadmin-routed.css'],
  imports: [JugadorPlistTeamAdminUnrouted],
})
export class JugadorPlistTeamAdminRouted {
  usuario = signal<number>(0);
  equipo = signal<number>(0);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id_usuario = this.route.snapshot.paramMap.get('id_usuario');
    if (id_usuario) {
      this.usuario.set(+id_usuario);
    }

    const id_equipo = this.route.snapshot.paramMap.get('id_equipo');
    if (id_equipo) {
      this.equipo.set(+id_equipo);
    }
  }
}
