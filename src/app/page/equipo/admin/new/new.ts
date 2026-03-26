import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoAdminForm } from '../../../../component/equipo/admin/form/form';

@Component({
  selector: 'app-equipo-admin-new-page',
  imports: [EquipoAdminForm],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class EquipoAdminNewPage {
  private router = inject(Router);

  onFormSuccess(): void {
    this.router.navigate(['/equipo']);
  }

  onFormCancel(): void {
    this.router.navigate(['/equipo']);
  }
}
