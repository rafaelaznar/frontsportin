import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticuloFormAdminUnrouted } from '../form-unrouted/articulo-form';

@Component({
  selector: 'app-articulo-new-routed',
  standalone: true,
  imports: [CommonModule, ArticuloFormAdminUnrouted],
  templateUrl: './articulo-new.html',
  styleUrl: './articulo-new.css',
})
export class ArticuloNewAdminRouted {
  private router = inject(Router);

  onFormSuccess(): void {
    this.router.navigate(['/articulo']);
  }

  onFormCancel(): void {
    this.router.navigate(['/articulo']);
  }
}
