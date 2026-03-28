import { Component, OnInit, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IEquipo } from '../../../../model/equipo';
import { ILiga } from '../../../../model/liga';
import { IPartido } from '../../../../model/partido';
import { EquipoService } from '../../../../service/equipo';
import { LigaService } from '../../../../service/liga';
import { PartidoService } from '../../../../service/partido';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface LigaConPartidos {
  liga: ILiga;
  partidos: IPartido[];
}

@Component({
  selector: 'app-equipo-usuario-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class EquipoUsuarioDetail implements OnInit {
  @Input() id_equipo = 0;

  private equipoService = inject(EquipoService);
  private ligaService = inject(LigaService);
  private partidoService = inject(PartidoService);

  equipo = signal<IEquipo | null>(null);
  ligasConPartidos = signal<LigaConPartidos[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    if (!this.id_equipo) return;
    this.equipoService.get(this.id_equipo).pipe(
      switchMap((eq) => {
        this.equipo.set(eq);
        return this.ligaService.getPage(0, 1000, 'id', 'asc', '', this.id_equipo);
      }),
      switchMap((ligaPage) => {
        const ligas = ligaPage.content;
        if (ligas.length === 0) return of([] as LigaConPartidos[]);
        const partidos$ = ligas.map((l) =>
          this.partidoService.getPage(0, 1000, 'id', 'asc', '', l.id).pipe(
            switchMap((pp) => of({ liga: l, partidos: pp.content } as LigaConPartidos)),
          ),
        );
        return forkJoin(partidos$);
      }),
    ).subscribe({
      next: (lcp) => {
        this.ligasConPartidos.set(lcp);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el equipo');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  resultadoClass(resultado: string | null | undefined): string {
    if (!resultado) return '';
    const parts = resultado.split('-').map((s) => parseInt(s.trim(), 10));
    if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return '';
    if (parts[0] > parts[1]) return 'res-win';
    if (parts[0] < parts[1]) return 'res-loss';
    return 'res-draw';
  }
}
