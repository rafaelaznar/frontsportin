import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaUsuarioDetail } from '../../../../component/noticia/usuario/detail/detail';

@Component({
  selector: 'app-noticia-usuario-view-page',
  standalone: true,
  imports: [NoticiaUsuarioDetail],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class NoticiaUsuarioViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_noticia = signal(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_noticia.set(id ? Number(id) : 0);
  }
}
