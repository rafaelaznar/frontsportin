import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ITemporada } from '../../model/temporada';
import { IPage } from '../../model/plist';
import { TemporadaService } from '../../service/temporada';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-temporada-plist',
  imports: [RouterLink],
  templateUrl: './temporada-plist.html',
  styleUrl: './temporada-plist.css',
})
export class TemporadaPlist {

  oPage: IPage<ITemporada> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  totalElementsCount: number = 0;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;


  constructor(private oTemporadaService: TemporadaService) { }

  oBotonera: string[] = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oTemporadaService.getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection).subscribe({
      next: (data: IPage<ITemporada>) => {
        this.oPage = data;
        // actualizar contador actual
        this.totalElementsCount = data.totalElements ?? 0;
        this.rellenaOk = this.totalElementsCount;
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
    this.getPage();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.getPage();
    return false;
  }

  
}
