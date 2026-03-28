import { Component } from '@angular/core';
import { FacturaUsuarioPlist } from '../../../../component/factura/usuario/plist/plist';

@Component({
  selector: 'app-factura-usuario-plist-page',
  standalone: true,
  imports: [FacturaUsuarioPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class FacturaUsuarioPlistPage {}
