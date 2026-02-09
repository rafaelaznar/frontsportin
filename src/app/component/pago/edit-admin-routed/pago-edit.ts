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
      this.pagoForm.markAllAsTouched();
      return;
    }

    // Convertir "2026-01-27T10:30" a "2026-01-27 10:30:00" para el backend
    const fechaBackend = this.pagoForm.value.fecha.replace('T', ' ') + ':00';

console.log('oPago antes de enviar:', this.oPago());
console.log('cuota:', this.oPago()?.cuota);
console.log('jugador:', this.oPago()?.jugador);


    const payload: Partial<IPago> = {
      id: this.id_pago(),
      abonado: Number(this.pagoForm.value.abonado),
      fecha: fechaBackend,
    };

    this.oPagoService.update(payload).subscribe({
      next: () => {
        this.snackBar.open('Pago guardado correctamente', 'Cerrar', { duration: 3000 });
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error al guardar el pago');
        this.snackBar.open('Error al guardar el pago', 'Cerrar', { duration: 4000 });
        console.error(err);
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