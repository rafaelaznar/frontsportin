import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IPage } from '../../model/plist';
import { ITipoarticulo } from '../../model/tipoarticulo';
import { Paginacion } from '../shared/paginacion/paginacion';
import { BotoneraRpp } from '../shared/botonera-rpp/botonera-rpp';
import { TipoarticuloService } from '../../service/tipoarticulo';

@Component({
  selector: 'app-tipoarticulo-plist',
  imports: [CommonModule, FormsModule, Paginacion, BotoneraRpp],
  templateUrl: './tipoarticulo-plist.html',
  styleUrl: './tipoarticulo-plist.css',
})
export class TipoarticuloPlist implements OnInit {
  oPage: IPage<ITipoarticulo> | null = null;
  numPage: number = 0;
  numRpp: number = 5;

  // For fill functionality
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: string = '';
  rellenaError: string = '';
  totalElementsCount: number = 0;

  constructor(private oTipoarticuloService: TipoarticuloService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.oTipoarticuloService.getPage(this.numPage, this.numRpp).subscribe({
      next: (data: IPage<ITipoarticulo>) => {
        this.oPage = data;
        this.totalElementsCount = data.totalElements ?? 0;
        this.cdr.markForCheck();
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

  doRppChange(rpp: number): void {
    this.numRpp = rpp;
    this.numPage = 0;
    this.getPage();
  }

  doPageChange(page: number): void {
    this.numPage = page;
    this.getPage();
  }
}
