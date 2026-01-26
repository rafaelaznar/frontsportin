import { Component, EventEmitter, Input, Output } from '@angular/core';
import { neighborhood } from '../../../environment/environment';

@Component({
  selector: 'app-paginacion',
  imports: [],
  templateUrl: './paginacion.html',
  styleUrl: './paginacion.css',
})
export class Paginacion {

  @Input() numPage: number = 0;
  @Input() numPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  //---
  oBotonera: string[] = [];

  ngOnChanges() {
    this.oBotonera = this.getBotonera(this.numPage, this.numPages);
  }

  getBotonera(numPag: number, numPages: number): string[] {
    // el usuario siempre espera que las páginas sean 1-based (la primera un uno)
    // sin embargo, el backend trabaja con páginas 0-based (la primera es la 0)
    let botonera: string[] = [];
    let paginaActual = numPag + 1;

    for (let i = 1; i <= numPages; i++) {
      if (i == 1) { // primera
        botonera.push('1');
      } else if (i == paginaActual) { // actual
        botonera.push(i.toString())
      } else if (i == numPages) { // última
        botonera.push(i.toString())
      } else if (i >= paginaActual - neighborhood && i < paginaActual) { //vecindad por abajo
        botonera.push(i.toString())
      } else if (i <= paginaActual + neighborhood && i > paginaActual) { //vecindad por arriba
        botonera.push(i.toString())
      } else if (i == paginaActual - neighborhood - 1) { // abreviación de paginas por abajo
        botonera.push('...')
      } else if (i == paginaActual + neighborhood + 1) { // abreviación de paginas por arriba
        botonera.push('...')
      }
    }
    return botonera;
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.pageChange.emit(this.numPage);
    return false;
  }

}
