import { Component } from '@angular/core';
import { CuotaUsuarioPlist } from '../../../../component/cuota/usuario/plist/plist';

@Component({
  selector: 'app-cuota-usuario-plist-page',
  standalone: true,
  imports: [CuotaUsuarioPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class CuotaUsuarioPlistPage {}
