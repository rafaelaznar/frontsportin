import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TipoarticuloFormAdminUnrouted } from '../form-unrouted/tipoarticulo-form';

@Component({
  selector: 'app-tipoarticulo-new-routed',
  standalone: true,
  imports: [CommonModule, TipoarticuloFormAdminUnrouted],
  templateUrl: './tipoarticulo-new.html',
  styleUrls: ['./tipoarticulo-new.css'],
})
export class TipoarticuloNewAdminRouted {
  private router = inject(Router);

  onFormSuccess(): void {
    this.router.navigate(['/tipoarticulo']);
  }

  onFormCancel(): void {
    this.router.navigate(['/tipoarticulo']);
  }
}
