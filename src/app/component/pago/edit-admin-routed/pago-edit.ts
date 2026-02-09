import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../../service/pago';
import { IPago } from '../../../model/pago';
import { PagoDetailAdminUnrouted } from '../detail-admin-unrouted/pago-detail';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pago-edit',
  imports: [CommonModule, PagoDetailAdminUnrouted, ReactiveFormsModule],
  templateUrl: './pago-edit.html',
  styleUrl: './pago-edit.css',
})
export class PagoEditAdminRouted implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private oPagoService = inject(PagoService);
  private snackBar = inject(MatSnackBar);

  pagoForm!: FormGroup;
  oPago = signal<IPago | null>(null);
  error = signal<string | null>(null);
  id_pago = signal<number>(0);

  ngOnInit(): void {
    this.initForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_pago.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_pago())) {
      this.error.set('ID no válido');
      return;
    }
    this.loadPago(this.id_pago());
  }

  initForm(): void {
    this.pagoForm = this.fb.group({
      abonado: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });
  }

  loadPago(id: number): void {
    this.oPagoService.get(id).subscribe({
      next: (pago: IPago) => {
        this.oPago.set(pago);
        // Convertir "2026-01-27 10:30:00" a "2026-01-27T10:30" para datetime-local
        const fechaFormatted = pago.fecha.replace(' ', 'T').substring(0, 16);
        this.pagoForm.patchValue({
          abonado: pago.abonado,
          fecha: fechaFormatted,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error al cargar el pago');
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    if (!this.pagoForm.valid) {
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', { duration: 4000 });
      return;
    }

    const pago = this.oPago();
    if (!pago || !pago.cuota || !pago.jugador) {
      this.snackBar.open('Error: datos del pago no cargados correctamente', 'Cerrar', { duration: 4000 });
      return;
    }

    // Convertir "2026-01-27T10:30" a "2026-01-27 10:30:00" para el backend
    const fechaBackend = this.pagoForm.value.fecha.replace('T', ' ') + ':00';

    const pagoData: IPago = {
      ...pago,  // Mantiene todas las propiedades originales (cuota y jugador completos)
      abonado: Number(this.pagoForm.value.abonado),
      fecha: fechaBackend
    };

    console.log('Payload a enviar:', pagoData);

    this.oPagoService.update(pagoData).subscribe({
      next: (id: number) => {
        this.snackBar.open('Pago actualizado exitosamente', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/pago']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error actualizando el pago');
        console.error('Error completo:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error body:', err.error);
        this.snackBar.open('Error actualizando el pago: ' + (err.error?.message || err.message), 'Cerrar', { duration: 4000 });
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }

  get abonado() {
    return this.pagoForm.get('abonado');
  }

  get fecha() {
    return this.pagoForm.get('fecha');
  }
}