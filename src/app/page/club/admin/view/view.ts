import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ClubService } from '../../../../service/club';
import { IClub } from '../../../../model/club';
import { ClubAdminDetail } from '../../../../component/club/admin/detail/detail';

@Component({
  selector: 'app-club-admin-view-page',
  imports: [ClubAdminDetail],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class ClubAdminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  private clubService = inject(ClubService);

  oClub = signal<IClub | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  id_club = signal<number>(0);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_club.set(idParam ? Number(idParam) : NaN);

    if (isNaN(this.id_club())) {
      this.error.set('ID no valido');
      this.loading.set(false);
      return;
    }

    this.load(this.id_club());
  }

  private load(id: number) {
    this.clubService.get(id).subscribe({
      next: (data: IClub) => {
        this.oClub.set(data);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error al recuperar el club: ' + err.message);
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
