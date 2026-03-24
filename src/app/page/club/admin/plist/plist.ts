import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubAdminPlist } from '../../../../component/club/admin/plist/plist';


@Component({
  selector: 'app-club-admin-plist-page',
  imports: [ClubAdminPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ClubAdminPlistPage {
  // No se necesita filtro por club en el plist de clubes
  // ya que club no tiene relación con otro club
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // No hay parámetros de ruta para club
  }
}
