import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../environment/environment';
import { IPage } from '../model/plist';
import { IUsuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    rpp: number,
    order: string = '',
    direction: string = '',
    nombre: string = '',
    idTipousuario: number = 0,
    idRol: number = 0,
    idClub: number = 0
  ): Observable<IPage<IUsuario>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }

    let strUrl = `${serverURL}/usuario?page=${page}&size=${rpp}&sort=${order},${direction}`;

    if (idTipousuario > 0) {
      strUrl += `&idTipousuario=${idTipousuario}`;
      return this.oHttp.get<IPage<IUsuario>>(strUrl);
    }

    if (idRol > 0) {
      strUrl += `&idRol=${idRol}`;
      return this.oHttp.get<IPage<IUsuario>>(strUrl);
    }

    if (idClub > 0) {
      strUrl += `&idClub=${idClub}`;
      return this.oHttp.get<IPage<IUsuario>>(strUrl);
    }

    if (nombre && nombre.length > 0) {
      strUrl += `&nombre=${encodeURIComponent(nombre)}`;
      return this.oHttp.get<IPage<IUsuario>>(strUrl);
    }

    return this.oHttp.get<IPage<IUsuario>>(strUrl);
  }

  fill(amount: number): Observable<number> {
    return this.oHttp.post<number>(`${serverURL}/usuario/fill/${amount}`, null);
  }
}
