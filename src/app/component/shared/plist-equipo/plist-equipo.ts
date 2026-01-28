import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { rpp as RPP } from '../../../environment/environment';
import { EquipoService } from '../../../service/equipo.service';
import { IEquipo, IPageEquipo } from '../../../model/equipo';

@Component({
  selector: 'app-plist-equipo',
  imports: [],
  templateUrl: './plist-equipo.html',
  styleUrl: './plist-equipo.css',
  standalone: true
})
export class PlistEquipo {

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  // lista y paginación
  aEquipos: IEquipo[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;
  totalElements: number = 0;
  // ordenar por id ascendente por defecto (menor a mayor)
  sort: string = 'id,asc';

  // filtros
  selCategoriaId?: number = undefined; // se enviará como idCuota por inconsistencia del backend
  selEntrenadorId?: number = undefined;

  rpp = RPP;

  loading: boolean = false;
  error: string | null = null;
  

  ngOnInit() {
    this.loadPage();
  }

  async loadPage(page: number = this.pageNumber) {
    this.loading = true;
    this.error = null;
    try {
      const res: IPageEquipo = await EquipoService.getPage({ page, size: this.pageSize, sort: this.sort, idCuota: this.selCategoriaId, idUsuario: this.selEntrenadorId });
      this.aEquipos = res.content || [];
      this.pageNumber = res.number || 0;
      this.pageSize = res.size || this.pageSize;
      this.totalPages = res.totalPages || 1;
      this.totalElements = res.totalElements || 0;
    } catch (err: any) {
      this.error = err?.message || ('Error ' + err?.status || 'Unknown');
      console.error('Error cargando equipos', err);
    } finally {
      this.loading = false;
      try { this.cd.detectChanges(); } catch (e) { /* ignore if not available */ }
    }
  }

  onPageChange(newPage: number) {
    // evitar páginas fuera de rango
    if (newPage < 0) return;
    if (this.totalPages != null && newPage >= this.totalPages) return;
    this.loadPage(newPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 0; i < this.totalPages; i++) pages.push(i);
    return pages;
  }

  onSizeChange(value: any) {
    this.pageSize = Number(value);
    this.loadPage(0);
  }

  

}
