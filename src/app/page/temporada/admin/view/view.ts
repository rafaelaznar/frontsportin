import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemporadaAdminDetail } from '../../../../component/temporada/admin/detail/detail';

@Component({
  selector: 'app-temporada-admin-view-page',
  imports: [TemporadaAdminDetail],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class TemporadaAdminViewPage implements OnInit {
  private route = inject(ActivatedRoute);

  id_temporada = signal<number>(0);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_temporada.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_temporada())) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }
    this.loading.set(false);
  }
}
