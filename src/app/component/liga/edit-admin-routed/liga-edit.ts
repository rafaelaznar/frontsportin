import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LigaService } from '../../../service/liga';
import { ILiga } from '../../../model/liga';
import { IEquipo } from '../../../model/equipo';

@Component({
  selector: 'app-liga-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './liga-edit.html',
  styleUrl: './liga-edit.css',
})
export class LigaEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private oLigaService = inject(LigaService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  id: number = 0;
  oLigaForm: FormGroup | null = null;
  loading = signal(true);

  constructor() {
    this.oLigaForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      id_equipo: ['', [Validators.required, Validators.min(1)]],
      partidos: [{ value: 0, disabled: true }],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : NaN;

    if (isNaN(this.id)) {
      this.snackBar.open('ID no valido', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/liga']);
      return;
    }

    this.getOne();
  }

  getOne() {
    this.oLigaService.get(this.id).subscribe({
      next: (data: ILiga) => {
        this.oLigaForm?.patchValue({
          id: data.id,
          nombre: data.nombre,
          id_equipo: data.equipo?.id ?? '',
          partidos: data.partidos ?? 0,
        });
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open('Error cargando la liga', 'Cerrar');
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.oLigaForm?.invalid) {
      this.snackBar.open('El formulario tiene errores', 'Cerrar');
      return;
    }

    const raw = this.oLigaForm?.getRawValue();
    const ligaToUpdate: Partial<ILiga> = {
      id: this.id,
      nombre: raw.nombre,
      equipo: { id: Number(raw.id_equipo) } as IEquipo,
    };

    this.oLigaService.update(ligaToUpdate).subscribe({
      next: () => {
        this.snackBar.open('Liga actualizada correctamente', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/liga/view', this.id]);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open('Error al actualizar la liga', 'Cerrar');
        console.error(err);
      },
    });
  }

  doCancel() {
    window.history.back();
  }
}
