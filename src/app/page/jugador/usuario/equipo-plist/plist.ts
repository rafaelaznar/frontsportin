import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorUsuarioEquipoPlist } from '../../../../component/jugador/usuario/equipo-plist/plist';

@Component({
  selector: 'app-jugador-usuario-equipo-plist-page',
  standalone: true,
  imports: [JugadorUsuarioEquipoPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class JugadorUsuarioEquipoPlistPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_equipo = signal(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(id ? Number(id) : 0);
  }
}
