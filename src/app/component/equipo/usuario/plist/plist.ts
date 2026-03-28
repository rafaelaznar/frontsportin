import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IEquipo } from '../../../../model/equipo';
import { EquipoService } from '../../../../service/equipo';
import { SessionService } from '../../../../service/session';

interface TemporadaGroup {
  descripcion: string;
  id: number;
  categorias: CategoriaGroup[];
}

interface CategoriaGroup {
  nombre: string;
  id: number;
  equipos: EquipoRow[];
}

interface EquipoRow {
  id: number;
  nombre: string;
  ligasCount: number;
}

@Component({
  selector: 'app-equipo-usuario-plist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class EquipoUsuarioPlist implements OnInit {
  private equipoService = inject(EquipoService);
  private session = inject(SessionService);

  temporadas = signal<TemporadaGroup[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  totalEquipos = computed(() =>
    this.temporadas().reduce((acc, t) => acc + t.categorias.reduce((a, c) => a + c.equipos.length, 0), 0),
  );

  ngOnInit(): void {
    const uid = this.session.getUserId();
    if (!uid) {
      this.error.set('No se puede determinar tu usuario');
      this.loading.set(false);
      return;
    }
    this.equipoService.getPage(0, 1000, 'id', 'asc', '', 0, uid).subscribe({
      next: (page) => {
        this.temporadas.set(this.buildGroups(page.content));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar tus equipos');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  private buildGroups(equipos: IEquipo[]): TemporadaGroup[] {
    const map = new Map<number, TemporadaGroup>();
    for (const equipo of equipos) {
      const cat = equipo.categoria;
      const temp = cat?.temporada;
      if (!temp || !cat || !equipo.id) continue;

      let tg = map.get(temp.id);
      if (!tg) {
        tg = { id: temp.id, descripcion: temp.descripcion, categorias: [] };
        map.set(temp.id, tg);
      }
      let cg = tg.categorias.find((c) => c.id === cat.id);
      if (!cg) {
        cg = { id: cat.id, nombre: cat.nombre, equipos: [] };
        tg.categorias.push(cg);
      }
      cg.equipos.push({
        id: equipo.id,
        nombre: equipo.nombre ?? '',
        ligasCount: equipo.ligas ?? 0,
      });
    }
    return Array.from(map.values()).sort((a, b) => b.id - a.id);
  }
}
