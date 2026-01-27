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

  getPage(page: number, rpp: number, order: string = '', direction: string = '', filter: string = ''): Observable<IPage<IUsuario>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    let strUrl = `${serverURL}/usuario?page=${page}&size=${rpp}&sort=${order},${direction}`;
    if (filter.length > 0) {
      strUrl += `&nombre=${encodeURIComponent(filter)}`;
    }
    return this.oHttp.get<IPage<IUsuario>>(strUrl);
  }

  fill(amount: number): Observable<number> {
    return this.oHttp.post<number>(`${serverURL}/usuario/fill/${amount}`, null);
  }
}
