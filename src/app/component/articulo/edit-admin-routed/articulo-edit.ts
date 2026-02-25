import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloService } from '../../../service/articulo';
import { IArticulo } from '../../../model/articulo';
import { ArticuloFormAdminUnrouted } from '../form-unrouted/articulo-form';

@Component({
  selector: 'app-articulo-edit-routed',
  standalone: true,
  imports: [CommonModule, ArticuloFormAdminUnrouted],
  templateUrl: './articulo-edit.html',
  styleUrl: './articulo-edit.css',
})
export class ArticuloEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private oArticuloService = inject(ArticuloService);
  private snackBar = inject(MatSnackBar);

  articulo = signal<IArticulo | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || idParam === '0') {
      this.error.set('ID de artículo no válido');
      this.loading.set(false);
      return;
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }

    this.loadArticulo(id);
  }

  private loadArticulo(id: number): void {
    this.oArticuloService.get(id).subscribe({
      next: (articulo: IArticulo) => {
        this.articulo.set(articulo);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando el artículo');
        this.snackBar.open('Error cargando el artículo', 'Cerrar', { duration: 4000 });
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  onFormSuccess(): void {
    this.router.navigate(['/articulo']);
  }

  onFormCancel(): void {
    this.router.navigate(['/articulo']);
  }
}
