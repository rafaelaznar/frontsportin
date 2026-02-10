import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagoService } from '../../../service/pago';
import { CuotaService } from '../../../service/cuota';
import { JugadorService } from '../../../service/jugador-service';
import { IPago } from '../../../model/pago';
import { ICuota } from '../../../model/cuota';
import { IJugador } from '../../../model/jugador';

@Component({
  selector: 'app-pago-edit-admin-routed',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pago-edit.html',
  styleUrl: './pago-edit.css',
})
export class PagoEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private oPagoService = inject(PagoService);
  private oCuotaService = inject(CuotaService);
  private oJugadorService = inject(JugadorService);
  private snackBar = inject(MatSnackBar);

  pagoForm!: FormGroup;
  id_pago = signal<number>(0);
  loading = signal(true);
  error = signal<string | null>(null);
  submitting = signal(false);

  oCuota = signal<ICuota | null>(null);
  oJugador = signal<IJugador | null>(null);

  ngOnInit(): void {
    this.initForm();
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || idParam === '0') {
      this.error.set('ID de pago no válido');
      this.loading.set(false);
      return;
    }

    this.id_pago.set(Number(idParam));

    if (isNaN(this.id_pago())) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }

    this.loadPago();
  }

  private initForm(): void {
    this.pagoForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      abonado: [0, [Validators.required, Validators.min(0)]],
      fecha: ['', [Validators.required]],
      id_cuota: [null, [Validators.required]],
      id_jugador: [null, [Validators.required]],
    });
  }

  private loadPago(): void {
    this.oPagoService.get(this.id_pago()).subscribe({
      next: (pago: IPago) => {
        this.oCuota.set(pago.cuota);
        this.oJugador.set(pago.jugador);

        // Convertir "2026-01-27 10:30:00" a "2026-01-27T10:30" para datetime-local
        const fechaFormatted = pago.fecha.replace(' ', 'T').substring(0, 16);

        this.pagoForm.patchValue({
          id: pago.id,
          abonado: pago.abonado,
          fecha: fechaFormatted,
          id_cuota: pago.cuota?.id,
          id_jugador: pago.jugador?.id,
        });
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando el pago');
        this.snackBar.open('Error cargando el pago', 'Cerrar', { duration: 4000 });
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  get abonado() {
    return this.pagoForm.get('abonado');
  }

  get fecha() {
    return this.pagoForm.get('fecha');
  }

  get id_cuota() {
    return this.pagoForm.get('id_cuota');
  }

  get id_jugador() {
    return this.pagoForm.get('id_jugador');
  }

  onSubmit(): void {
    if (this.pagoForm.invalid) {
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', {
        duration: 4000,
      });
      return;
    }

    this.submitting.set(true);

    // Convertir "2026-01-27T10:30" a "2026-01-27 10:30:00" para el backend
    const fechaBackend = this.pagoForm.value.fecha.replace('T', ' ') + ':00';

    const pagoData: any = {
      id: this.id_pago(),
      abonado: this.pagoForm.value.abonado || 0,
      fecha: fechaBackend,
      cuota: { id: this.pagoForm.value.id_cuota },
      jugador: { id: this.pagoForm.value.id_jugador },
    };
    this.oPagoService.update(pagoData).subscribe({
      next: (id: number) => {
        this.snackBar.open('Pago actualizado exitosamente', 'Cerrar', { duration: 4000 });
        this.submitting.set(false);
        this.router.navigate(['/pago']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error actualizando el pago');
        this.snackBar.open('Error actualizando el pago', 'Cerrar', { duration: 4000 });
        console.error(err);
        this.submitting.set(false);
      },
    });
  }

  doCancel(): void {
    this.router.navigate(['/pago']);
  }
}
