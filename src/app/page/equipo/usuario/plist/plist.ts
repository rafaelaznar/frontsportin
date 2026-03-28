import { Component } from '@angular/core';
import { EquipoUsuarioPlist } from '../../../../component/equipo/usuario/plist/plist';

@Component({
  selector: 'app-equipo-usuario-plist-page',
  standalone: true,
  imports: [EquipoUsuarioPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class EquipoUsuarioPlistPage {}
