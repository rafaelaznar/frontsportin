import { Component, signal, OnInit, inject, Input, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TipoarticuloService } from '../../../service/tipoarticulo';
import { ITipoarticulo } from '../../../model/tipoarticulo';

@Component({
  selector: 'app-tipoarticulo-detail-unrouted',
  imports: [CommonModule, RouterLink],
  templateUrl: './tipoarticulo-detail.html',
  styleUrl: './tipoarticulo-detail.css',
})
export class TipoarticuloDetailAdminUnrouted implements OnInit {
  @Input() id: Signal<number> = signal(0);

  private oTipoarticuloService = inject(TipoarticuloService);

  oTipoarticulo = signal<ITipoarticulo | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.load(this.id());
  }

  load(id: number) {
    this.oTipoarticuloService.get(id).subscribe({
      next: (data: ITipoarticulo) => {
        this.oTipoarticulo.set(data);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando el tipo de artículo');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
