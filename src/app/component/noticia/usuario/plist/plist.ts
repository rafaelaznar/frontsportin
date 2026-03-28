import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { INoticia } from '../../../../model/noticia';
import { IPage } from '../../../../model/plist';
import { NoticiaService } from '../../../../service/noticia';
import { SessionService } from '../../../../service/session';
import { DatetimePipe } from '../../../../pipe/datetime-pipe';

@Component({
  selector: 'app-noticia-usuario-plist',
  standalone: true,
  imports: [CommonModule, RouterLink, DatetimePipe],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class NoticiaUsuarioPlist implements OnInit {
  private noticiaService = inject(NoticiaService);
  private session = inject(SessionService);

  oPage = signal<IPage<INoticia> | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  ngOnInit(): void {
    const clubId = this.session.getClubId() ?? 0;
    this.noticiaService.getPage(0, 1000, 'fecha', 'desc', '', clubId).subscribe({
      next: (page) => {
        this.oPage.set(page);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar noticias');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
