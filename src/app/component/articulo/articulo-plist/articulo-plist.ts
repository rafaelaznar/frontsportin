import { Component } from '@angular/core';
import { IArticulo } from '../../../model/articulo';
import { IPage } from '../../../model/plist';
import { ArticuloService } from '../../../service/articulo';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";

@Component({
  selector: 'app-articulo-plist',
  imports: [Paginacion, BotoneraRpp],
  templateUrl: './articulo-plist.html',
  styleUrl: './articulo-plist.css',
})
export class AdminPlist {

  oPage: IPage<IArticulo> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;
  publishingId: number | null = null;
  publishingAction: 'publicar' | 'despublicar' | null = null;

  // Mensajes y total
  message: string | null = null;
  totalRecords: number = 0;
  private messageTimeout: any = null;

  // Variables de ordenamiento
  orderField: string = 'id';
  orderDirection: 'asc' | 'desc' = 'asc';

  constructor(private oArticuloService: ArticuloService, private route: ActivatedRoute) { }

  ngOnInit() {
    const msg = this.route.snapshot.queryParamMap.get('msg');
    if (msg) {
      this.showMessage(msg);
    }
    this.getPage();
  }

  private showMessage(msg: string, duration: number = 4000) {
    this.message = msg;
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageTimeout = setTimeout(() => {
      this.message = null;
      this.messageTimeout = null;
    }, duration);
  }

  getPage() {
    this.oArticuloService.getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection).subscribe({
      next: (data: IPage<IArticulo>) => {
        this.oPage = data;
        this.totalRecords = data?.totalElements ?? 0;
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
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.numPage = 0;
    this.getPage();
  }

  onCantidadChange(value: string) {
    this.rellenaCantidad = +value;
  }

}
