import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IFactura } from '../../../../model/factura';
import { ICompra } from '../../../../model/compra';
import { FacturaService } from '../../../../service/factura-service';
import { CompraService } from '../../../../service/compra';
import { SessionService } from '../../../../service/session';

interface FacturaRow {
  factura: IFactura;
  compras: ICompra[];
  total: number;
  expanded: boolean;
}

@Component({
  selector: 'app-factura-usuario-plist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class FacturaUsuarioPlist implements OnInit {
  private facturaService = inject(FacturaService);
  private compraService = inject(CompraService);
  private session = inject(SessionService);

  rows = signal<FacturaRow[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const uid = this.session.getUserId();
    if (!uid) {
      this.loading.set(false);
      return;
    }
    this.facturaService
      .getPage(0, 1000, 'id', 'desc', uid)
      .pipe(
        switchMap((page) => {
          const facturas = page.content;
          if (facturas.length === 0) return of([] as FacturaRow[]);
          return forkJoin(
            facturas.map((f) =>
              this.compraService.getPage(0, 1000, 'id', 'asc', 0, f.id).pipe(
                switchMap((cp) => {
                  const total = cp.content.reduce((acc, c) => acc + c.precio * c.cantidad, 0);
                  return of({ factura: f, compras: cp.content, total, expanded: false } as FacturaRow);
                }),
              ),
            ),
          );
        }),
      )
      .subscribe({
        next: (rows) => {
          this.rows.set(rows);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Error al cargar las facturas');
          this.loading.set(false);
        },
      });
  }

  toggleExpand(row: FacturaRow): void {
    row.expanded = !row.expanded;
    this.rows.set([...this.rows()]);
  }
}
