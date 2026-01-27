import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL } from '../environment/environment';
import { IPage } from '../model/plist';
import { noticiaModel } from '../model/noticia-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class NoticiaService {

  constructor(private oHttp: HttpClient) { }

getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<noticiaModel>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    return this.oHttp.get<IPage<noticiaModel>>(serverURL + `/noticia?page=${page}&size=${rpp}&sort=${order},${direction}`);
  }
}
