import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LigaDetailAdminUnrouted } from '../detail-admin-unrouted/liga-detail';
import { LigaService } from '../../../service/liga';
import { ILiga } from '../../../model/liga';

@Component({
  selector: 'app-liga-delete',
  imports: [CommonModule, LigaDetailAdminUnrouted],
  templateUrl: './liga-delete.html',
  styleUrl: './liga-delete.css',
})
export class LigaDeleteAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private oLigaService = inject(LigaService);
  private snackBar = inject(MatSnackBar);

  oLiga = signal<ILiga | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  id_liga = signal<number>(0);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_liga.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_liga())) {
      this.error.set('ID no valido');
      this.loading.set(false);
      return;
    }
    this.load(this.id_liga());
  }

  load(id: number) {
    this.oLigaService.get(id).subscribe({
      next: (data: ILiga) => {
        this.oLiga.set(data);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando la liga');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  doDelete() {
    const liga = this.oLiga();
    if (!liga) {
      this.snackBar.open('No se ha podido cargar la liga', 'Cerrar', { duration: 4000 });
      return;
    }
    if ((liga.partidos ?? 0) > 0) {
      this.snackBar.open('No se puede eliminar una liga con partidos asociados', 'Cerrar', { duration: 4000 });
      return;
    }

    this.oLigaService.delete(this.id_liga()).subscribe({
      next: () => {
        this.snackBar.open('Liga eliminada', 'Cerrar', { duration: 4000 });
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error eliminando la liga');
        this.snackBar.open('Error eliminando la liga', 'Cerrar', { duration: 4000 });
        console.error(err);
      },
    });
  }

  doCancel() {
    window.history.back();
  }
}
