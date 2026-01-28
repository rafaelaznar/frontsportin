import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Noticia, NoticiaService } from '../../service/noticia-service';

@Component({
  selector: 'app-unrouted-noticia-view',
  imports: [CommonModule],
  templateUrl: './unrouted-noticia-view.html',
  styleUrl: './unrouted-noticia-view.css',
})
export class UnroutedNoticiaView implements OnInit {

  @Input() noticiaId!: number;
  noticiaSeleccionada?: Noticia;

  constructor(private noticiaService: NoticiaService) {

  }

  ngOnInit(): void {
    if (this.noticiaId) {
      this.noticiaService.getNoticiaById(this.noticiaId).subscribe({
        next: noticia => this.noticiaSeleccionada = noticia,
        error: err => console.error('Error al cargar la noticia: ', err)
      });
    } else {
      console.warn('No se proporcionó ningún ID de noticia')
    }
  }
}
