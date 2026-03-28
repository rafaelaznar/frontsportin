import { Component, OnInit, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IJugador } from '../../../../model/jugador';
import { JugadorService } from '../../../../service/jugador-service';
import { EquipoService } from '../../../../service/equipo';
import { IEquipo } from '../../../../model/equipo';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-jugador-usuario-equipo-plist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class JugadorUsuarioEquipoPlist implements OnInit {
  @Input() id_equipo = 0;

  private jugadorService = inject(JugadorService);
  private equipoService = inject(EquipoService);

  jugadores = signal<IJugador[]>([]);
  equipo = signal<IEquipo | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    if (!this.id_equipo) {
      this.error.set('ID de equipo no válido');
      this.loading.set(false);
      return;
    }
    forkJoin({
      equipo: this.equipoService.get(this.id_equipo),
      jugadores: this.jugadorService.getPage(0, 1000, 'dorsal', 'asc', '', 0, this.id_equipo),
    }).subscribe({
      next: ({ equipo, jugadores }) => {
        this.equipo.set(equipo);
        this.jugadores.set(jugadores.content);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los jugadores');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
