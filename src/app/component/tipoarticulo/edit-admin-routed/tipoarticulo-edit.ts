import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoarticuloService } from '../../../service/tipoarticulo';
import { ITipoarticulo } from '../../../model/tipoarticulo';
import { TipoarticuloFormAdminUnrouted } from '../form-unrouted/tipoarticulo-form';

@Component({
  selector: 'app-tipoarticulo-edit-routed',
  standalone: true,
  imports: [CommonModule, TipoarticuloFormAdminUnrouted],
  templateUrl: './tipoarticulo-edit.html',
  styleUrl: './tipoarticulo-edit.css',
})
export class TipoarticuloEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private oTipoarticuloService = inject(TipoarticuloService);
  private snackBar = inject(MatSnackBar);

  id_tipoarticulo = signal<number>(0);
  loading = signal(true);
  error = signal<string | null>(null);
  tipoarticulo = signal<ITipoarticulo | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const nid = +id;
      if (isNaN(nid)) {
        this.error.set('ID no válido');
        this.loading.set(false);
        return;
      }
      this.id_tipoarticulo.set(nid);
      this.loadTipoarticulo(nid);
    } else {
      this.error.set('ID de tipo de artículo no válido');
      this.loading.set(false);
    }
  }

  private loadTipoarticulo(id: number): void {
    this.oTipoarticuloService.get(id).subscribe({
      next: (data: ITipoarticulo) => {
        this.tipoarticulo.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error cargando el tipo de artículo', 'Cerrar', { duration: 4000 });
        this.error.set('Error cargando el tipo de artículo');
        this.loading.set(false);
      },
    });
  }

  onFormSuccess(): void {
    this.router.navigate(['/tipoarticulo']);
  }

  onFormCancel(): void {
    this.router.navigate(['/tipoarticulo']);
  }
}
