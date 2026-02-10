import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoarticuloService } from '../../../service/tipoarticulo';
import { ITipoarticulo } from '../../../model/tipoarticulo';
import { TipoarticuloDetailAdminUnrouted } from '../detail-admin-unrouted/tipoarticulo-detail';

@Component({
  selector: 'app-tipoarticulo-edit',
  imports: [CommonModule, ReactiveFormsModule, TipoarticuloDetailAdminUnrouted],
  templateUrl: './tipoarticulo-edit.html',
  styleUrl: './tipoarticulo-edit.css',
})
export class TipoarticuloEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private oTipoarticuloService = inject(TipoarticuloService);
  private snackBar = inject(MatSnackBar);

  tipoarticuloForm!: FormGroup;
  oTipoarticulo = signal<ITipoarticulo | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  id_tipoarticulo = signal<number>(0);
  submitting = signal(false);

  ngOnInit(): void {
    this.initForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_tipoarticulo.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_tipoarticulo())) {
      this.error.set('ID no válido');
      return;
    }
    this.loadTipoarticulo(this.id_tipoarticulo());
  }

  initForm(): void {
    this.tipoarticuloForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      id_club: ['', [Validators.required]],
    });
  }

  loadTipoarticulo(id: number): void {
    this.oTipoarticuloService.get(id).subscribe({
      next: (tipoarticulo: ITipoarticulo) => {
        this.tipoarticuloForm.patchValue({
          id: tipoarticulo.id,
          descripcion: tipoarticulo.descripcion,
          id_club: tipoarticulo.club.id,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error al cargar el tipo de artículo');
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    if (!this.tipoarticuloForm.valid) {
      this.tipoarticuloForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const payload: Partial<ITipoarticulo> = {
      id: this.id_tipoarticulo(),
      descripcion: this.tipoarticuloForm.value.descripcion,
      club: { id: this.tipoarticuloForm.value.id_club } as any,
    };

    this.oTipoarticuloService.update(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        if (this.tipoarticuloForm) {
          this.tipoarticuloForm.markAsPristine();
        }
        this.snackBar.open('Tipo de artículo guardado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/tipoarticulo']);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.error.set('Error al guardar el tipo de artículo');
        this.snackBar.open('Error al guardar el tipo de artículo', 'Cerrar', { duration: 4000 });
        console.error(err);
      },
    });
  }

  doCancel(): void {
    this.router.navigate(['/tipoarticulo']);
  }

  get descripcion() {
    return this.tipoarticuloForm.get('descripcion');
  }

  get id_club() {
    return this.tipoarticuloForm.get('id_club');
  }
}