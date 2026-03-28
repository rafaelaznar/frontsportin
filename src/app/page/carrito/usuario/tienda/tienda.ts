import { Component } from '@angular/core';
import { CarritoUsuarioTienda } from '../../../../component/carrito/usuario/tienda/tienda';

@Component({
  selector: 'app-carrito-usuario-tienda-page',
  standalone: true,
  imports: [CarritoUsuarioTienda],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
})
export class CarritoUsuarioTiendaPage {}
