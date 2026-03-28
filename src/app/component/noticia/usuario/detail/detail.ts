import { Component, OnInit, Input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { INoticia } from '../../../../model/noticia';
import { IComentario } from '../../../../model/comentario';
import { IPuntuacion } from '../../../../model/puntuacion';
import { NoticiaService } from '../../../../service/noticia';
import { ComentarioService } from '../../../../service/comentario';
import { PuntuacionService } from '../../../../service/puntuacion';
import { SessionService } from '../../../../service/session';
import { DatetimePipe } from '../../../../pipe/datetime-pipe';

@Component({
  selector: 'app-noticia-usuario-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DatetimePipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class NoticiaUsuarioDetail implements OnInit {
  @Input() id_noticia = 0;

  private noticiaService = inject(NoticiaService);
  private comentarioService = inject(ComentarioService);
  private puntuacionService = inject(PuntuacionService);
  private session = inject(SessionService);

  noticia = signal<INoticia | null>(null);
  comentarios = signal<IComentario[]>([]);
  miPuntuacion = signal<IPuntuacion | null>(null);
  puntuacionMedia = signal<number>(0);
  loading = signal(true);
  loadingComentarios = signal(false);
  error = signal<string | null>(null);
  message = signal<string | null>(null);

  nuevoComentario = signal('');
  nuevaPuntuacion = signal(0);
  deletingId = signal<number | null>(null);

  userId = computed(() => this.session.getUserId());

  ngOnInit(): void {
    if (!this.id_noticia) return;
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.noticiaService.getById(this.id_noticia).subscribe({
      next: (n) => {
        this.noticia.set(n);
        this.loading.set(false);
        this.loadComentarios();
        this.loadPuntuaciones();
      },
      error: (err) => {
        this.error.set('Error al cargar la noticia');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  private loadComentarios(): void {
    this.loadingComentarios.set(true);
    this.comentarioService
      .getPage(0, 1000, 'id', 'desc', '', 0, this.id_noticia)
      .subscribe({
        next: (page) => {
          this.comentarios.set(page.content);
          this.loadingComentarios.set(false);
        },
        error: () => this.loadingComentarios.set(false),
      });
  }

  private loadPuntuaciones(): void {
    const uid = this.session.getUserId();
    if (!uid) return;
    this.puntuacionService.getPage(0, 1000, 'id', 'asc', this.id_noticia, 0).subscribe({
      next: (page) => {
        const total = page.totalElements;
        if (total > 0 && page.content.length > 0) {
          const sum = page.content.reduce((a, p) => a + p.puntuacion, 0);
          this.puntuacionMedia.set(Math.round((sum / page.content.length) * 10) / 10);
        }
        const mine = page.content.find((p) => p.usuario?.id === uid);
        if (mine) {
          this.miPuntuacion.set(mine);
          this.nuevaPuntuacion.set(mine.puntuacion);
        }
      },
    });
  }

  addComentario(): void {
    const contenido = this.nuevoComentario().trim();
    if (!contenido) return;
    const uid = this.session.getUserId();
    if (!uid) return;
    this.comentarioService
      .create({ contenido, noticia: { id: this.id_noticia } as any, usuario: { id: uid } as any })
      .subscribe({
        next: () => {
          this.nuevoComentario.set('');
          this.showMessage('Comentario añadido');
          this.loadComentarios();
        },
        error: () => this.showMessage('Error al añadir comentario'),
      });
  }

  deleteComentario(id: number): void {
    this.deletingId.set(id);
    this.comentarioService.delete(id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.showMessage('Comentario eliminado');
        this.loadComentarios();
      },
      error: () => {
        this.deletingId.set(null);
        this.showMessage('Error al eliminar comentario');
      },
    });
  }

  puntuarNoticia(): void {
    const uid = this.session.getUserId();
    if (!uid) return;
    const puntuacion = this.nuevaPuntuacion();
    if (puntuacion < 1 || puntuacion > 5) {
      this.showMessage('La puntuación debe estar entre 1 y 5');
      return;
    }
    if (this.miPuntuacion()) {
      this.puntuacionService
        .update({ id: this.miPuntuacion()!.id, puntuacion, noticia: { id: this.id_noticia } as any, usuario: { id: uid } as any })
        .subscribe({
          next: () => {
            this.showMessage('Puntuación actualizada');
            this.loadPuntuaciones();
          },
          error: () => this.showMessage('Error al actualizar puntuación'),
        });
    } else {
      this.puntuacionService
        .create({ puntuacion, noticia: { id: this.id_noticia } as any, usuario: { id: uid } as any })
        .subscribe({
          next: () => {
            this.showMessage('Puntuación guardada');
            this.loadPuntuaciones();
          },
          error: () => this.showMessage('Error al guardar puntuación'),
        });
    }
  }

  setEstrella(val: number): void {
    this.nuevaPuntuacion.set(val);
  }

  isMiComentario(comentario: IComentario): boolean {
    return comentario.usuario?.id === this.userId();
  }

  private showMessage(msg: string): void {
    this.message.set(msg);
    setTimeout(() => this.message.set(null), 4000);
  }
}
