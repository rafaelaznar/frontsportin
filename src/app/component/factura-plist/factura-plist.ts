import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IFactura } from '../../model/factura';
import { Paginacion } from '../shared/paginacion/paginacion';
import { BotoneraRpp } from '../shared/botonera-rpp/botonera-rpp';
import { DatetimePipe } from '../../pipe/datetime-pipe';
import { IPage } from '../../model/plist';
import { FacturaService } from '../../service/factura-service';




@Component({
  selector: 'app-factura-plist',
  standalone: true,
  imports: [Paginacion, BotoneraRpp, DatetimePipe],
  templateUrl: './factura-plist.html',
  styleUrl: './factura-plist.css',
})
export class FacturaPlist {
  oPage: IPage<IFactura> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  totalElementsCount: number = 0;

  orderField: string = 'id';
  orderDirection: string = 'asc';

  constructor(private oFacturaService: FacturaService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oFacturaService
      .getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection)
      .subscribe({
        next: (data: IPage<IFactura>) => {
          this.oPage = data;
          this.totalElementsCount = data.totalElements ?? 0;
          if (this.numPage > 0 && this.numPage >= data.totalPages) {
            this.numPage = data.totalPages - 1;
            this.getPage();
          }
          // Trigger view update under zoneless change detection
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  onOrder(order: string) {
    if (this.orderField === order) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = order;
      this.orderDirection = 'asc';
    }
    this.numPage = 0;
    this.getPage();
    return false;
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
  this.cdr.detectChanges();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.getPage();
  this.cdr.detectChanges();
    return false;
  }
}