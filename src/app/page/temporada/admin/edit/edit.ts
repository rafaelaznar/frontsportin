import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemporadaAdminForm } from '../../../../component/temporada/admin/form/form';

@Component({
  selector: 'app-temporada-admin-edit-page',
  imports: [TemporadaAdminForm],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class TemporadaAdminEditPage implements OnInit {
  id = signal<number>(0);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(+idParam);
    }
  }
}
