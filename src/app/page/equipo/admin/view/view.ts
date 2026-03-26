import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoAdminDetail } from '../../../../component/equipo/admin/detail/detail';

@Component({
  selector: 'app-equipo-admin-view-page',
  imports: [EquipoAdminDetail],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class EquipoAdminViewPage implements OnInit {
  private route = inject(ActivatedRoute);

  id_equipo = signal<number>(0);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(idParam ? Number(idParam) : NaN);
  }
}
