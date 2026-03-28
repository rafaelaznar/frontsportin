import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoUsuarioDetail } from '../../../../component/equipo/usuario/detail/detail';

@Component({
  selector: 'app-equipo-usuario-view-page',
  standalone: true,
  imports: [EquipoUsuarioDetail],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class EquipoUsuarioViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_equipo = signal(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(id ? Number(id) : 0);
  }
}
