import { Component } from '@angular/core';
import { NoticiaUsuarioPlist } from '../../../../component/noticia/usuario/plist/plist';

@Component({
  selector: 'app-noticia-usuario-plist-page',
  standalone: true,
  imports: [NoticiaUsuarioPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class NoticiaUsuarioPlistPage {}
