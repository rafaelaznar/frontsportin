import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClubAdminForm } from '../../../../component/club/admin/form/form';

@Component({
  selector: 'app-club-new-admin',
  imports: [CommonModule, ClubAdminForm],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class ClubAdminNewPage {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  error = signal<string | null>(null);

  onFormSuccess(): void {
    this.router.navigate(['/club']);
  }

  onFormCancel(): void {
    this.router.navigate(['/club']);
  }
}
