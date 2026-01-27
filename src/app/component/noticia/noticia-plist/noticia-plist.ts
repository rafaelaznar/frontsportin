import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { noticiaModel } from '../../../model/noticia-model';
import { IPage } from '../../../model/plist';
import { NoticiaService } from '../../../service/noticia-service';
import { Paginacion } from '../../shared/paginacion/paginacion';
import { BotoneraRpp } from '../../shared/botonera-rpp/botonera-rpp';
import { DatetimePipe } from '../../../pipe/datetime-pipe';

@Component({
  selector: 'app-noticia-plist',
  standalone: true,
  imports: [Paginacion, BotoneraRpp, DatetimePipe],
  templateUrl: './noticia-plist.html',
  styleUrl: './noticia-plist.css',
})
export class NoticiaPlist {
  oPage: IPage<noticiaModel> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  totalElementsCount: number = 0;

  orderField: string = 'id';
  orderDirection: string = 'asc';

  constructor(private oNoticiaService: NoticiaService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oNoticiaService
      .getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection)
      .subscribe({
        next: (data: IPage<noticiaModel>) => {
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
