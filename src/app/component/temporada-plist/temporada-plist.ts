import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ITemporada } from '../../model/temporada';
import { IPage } from '../../model/plist';
import { TemporadaService } from '../../service/temporada';
import { HttpErrorResponse } from '@angular/common/http';
import { Paginacion } from '../shared/paginacion/paginacion';
import { BotoneraRpp } from '../shared/botonera-rpp/botonera-rpp';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temporada-plist',
  imports: [Paginacion, BotoneraRpp],
  templateUrl: './temporada-plist.html',
  styleUrl: './temporada-plist.css',
})
export class TemporadaPlist {
  oPage: IPage<ITemporada> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  totalRecords: number = 0;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;
  message: string | null = null;

  constructor(
    private oTemporadaService: TemporadaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  // Variables de ordenamiento
  oBotonera: string[] = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';

  ngOnInit() {
    // Capturar el mensaje desde queryParams
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'] || null;
    });
    this.getPage();
  }

  getPage() {
    this.oTemporadaService
      .getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection)
      .subscribe({
        next: (data: IPage<ITemporada>) => {
          this.oPage = data;
          // actualizar contador actual
          this.totalRecords = data.totalElements ?? 0;
          this.rellenaOk = this.totalRecords;
          this.cdr.markForCheck();
          // si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
          if (this.numPage > 0 && this.numPage >= data.totalPages) {
            this.numPage = data.totalPages - 1;
            this.getPage();
          }
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
    console.log(`Yendo a página ${numPage}, orden: ${this.orderField} ${this.orderDirection}`);
    this.getPage();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.numPage = 0;
    this.getPage();
    return false;
  }
}
