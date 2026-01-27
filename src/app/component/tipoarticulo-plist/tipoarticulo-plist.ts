import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IPage, IPageable } from '../../model/plist';
import { ITipoarticulo } from '../../model/tipoarticulo';
import { Paginacion } from '../shared/paginacion/paginacion';
import { BotoneraRpp } from '../shared/botonera-rpp/botonera-rpp';
import { serverURL } from '../../environment/environment';

@Component({
  selector: 'app-tipoarticulo-plist',
  imports: [FormsModule, RouterLink, Paginacion, BotoneraRpp],
  templateUrl: './tipoarticulo-plist.html',
  styleUrl: './tipoarticulo-plist.css',
})
export class TipoarticuloPlist implements OnInit {
  oPage: IPage<ITipoarticulo> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  strFilter: string = '';
  idClubFilter: number | null = null;
  orderField: string = 'id';
  orderDirection: string = 'asc';

  // For fill functionality
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: string = '';
  rellenaError: string = '';

  // For empty functionality
  emptying: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPage();
  }

  getPage(): void {
    let params = new HttpParams()
      .set('page', this.numPage.toString())
      .set('size', this.numRpp.toString())
      .set('sort', this.orderField + ',' + this.orderDirection);

    if (this.strFilter) {
      params = params.set('descripcion', this.strFilter);
    }
    if (this.idClubFilter) {
      params = params.set('idClub', this.idClubFilter.toString());
    }

    this.http.get<IPage<ITipoarticulo>>(serverURL + '/tipoarticulo', { params }).subscribe({
      next: (data) => {
        this.oPage = data;
      },
      error: (error) => {
        console.error('Error fetching tipoarticulos', error);
      },
    });
  }

  doRppChange(rpp: number): void {
    this.numRpp = rpp;
    this.numPage = 0;
    this.getPage();
  }

  doPageChange(page: number): void {
    this.numPage = page;
    this.getPage();
  }

  doFilter(): void {
    this.numPage = 0;
    this.getPage();
  }

  onOrder(field: string): void {
    if (this.orderField === field) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = field;
      this.orderDirection = 'asc';
    }
    this.numPage = 0;
    this.getPage();
  }

  onCantidadChange(value: string): void {
    this.rellenaCantidad = parseInt(value);
  }

  generarFake(): void {
    this.rellenando = true;
    this.rellenaOk = '';
    this.rellenaError = '';
    this.http.post<number>(serverURL + '/tipoarticulo/fill/' + this.rellenaCantidad, {}).subscribe({
      next: (data) => {
        this.rellenando = false;
        this.rellenaOk = data + ' registros generados';
        this.getPage();
      },
      error: (error) => {
        this.rellenando = false;
        this.rellenaError = 'Error generando datos';
        console.error('Error filling tipoarticulos', error);
      },
    });
  }

  openEmptyConfirm(): void {
    if (confirm('¿Estás seguro de que quieres vaciar la tabla?')) {
      this.emptyTable();
    }
  }

  emptyTable(): void {
    this.emptying = true;
    this.http.delete<number>(serverURL + '/tipoarticulo/empty').subscribe({
      next: (data) => {
        this.emptying = false;
        this.getPage();
      },
      error: (error) => {
        this.emptying = false;
        console.error('Error emptying tipoarticulos', error);
      },
    });
  }
}
