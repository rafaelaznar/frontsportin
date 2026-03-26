import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemporadaAdminPlist } from '../../../../component/temporada/admin/plist/plist';

@Component({
  selector: 'app-temporada-admin-plist-page',
  imports: [TemporadaAdminPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class TemporadaAdminPlistPage {
  id_club = signal<number>(0);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_club');
    if (idParam) {
      this.id_club.set(Number(idParam));
    }
  }
}
