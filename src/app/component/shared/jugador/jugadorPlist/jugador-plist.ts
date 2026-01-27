import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paginacion } from '../../paginacion/paginacion';
import { BotoneraRpp } from '../../botonera-rpp/botonera-rpp';
import { JugadorService, IJugadorPage } from '../../../../service/jugador-service';

@Component({
  standalone: true,
  selector: 'app-jugador-plis',
  templateUrl: './jugador-plis.html',
  styleUrls: ['./jugador-plis.css'],
  imports: [
    CommonModule,
    Paginacion,
    BotoneraRpp
  ]
})
export class JugadorPlisComponent implements OnInit {

  oPage: IJugadorPage | null = null;
  numPage: number = 0;
  numRpp: number = 10;
  totalElementsCount: number = 0;

  orderField: string = 'id';
  orderDirection: string = 'asc';

  constructor(private jugadorService: JugadorService) {}

  ngOnInit(): void {
    this.getPage();
  }

  /** GETPAGE */
  getPage(): void {
    this.jugadorService.getPage(
      this.numPage, 
      this.numRpp, 
      this.orderField, 
      this.orderDirection
    ).subscribe({
      next: (data: IJugadorPage) => {
        this.oPage = data;
        this.totalElementsCount = data.totalElements;
      },
      error: (error) => {
        console.error('Error al cargar jugadores:', error);
      }
    });
  }

  goToPage(page: number): void {
    this.numPage = page;
    this.getPage();
  }

  onRppChange(rpp: number): void {
    this.numRpp = rpp;
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
    this.getPage();
  }
}
