import { Injectable } from '@angular/core';
import { ICuota } from '../model/cuota';
import { Observable } from 'rxjs';
import { IPage } from '../model/plist';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CuotaService {
  constructor(private http: HttpClient) {}

  getPage(
    page: number,
    rpp: number,
    order: string = '',
    direction: string = '',
    descripcion: string = '',
    id_equipo: number = 0,
  ): Observable<IPage<ICuota>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    if (id_equipo > 0) {
      return this.http.get<IPage<ICuota>>(
        serverURL +
          `/cuota?page=${page}&size=${rpp}&sort=${order},${direction}&id_equipo=${id_equipo}`,
      );
    }
    if (descripcion && descripcion.length > 0) {
      return this.http.get<IPage<ICuota>>(
        serverURL +
          `/cuota?page=${page}&size=${rpp}&sort=${order},${direction}&descripcion=${descripcion}`,
      );
    }
    return this.http.get<IPage<ICuota>>(
      serverURL + `/cuota?page=${page}&size=${rpp}&sort=${order},${direction}`,
    );
  }

  get(id: number): Observable<ICuota> {
    return this.http.get<ICuota>(serverURL + '/cuota/' + id);
  }

  count(): Observable<number> {
    return this.http.get<number>(serverURL + '/cuota/count');
  }
  
  delete(id: number): Observable<number> {
    return this.http.delete<number>(serverURL + '/cuota/' + id);
  }


  // create(cuota: Partial<ICuota>): Observable<number> {
  //   return this.oHttp.post<number>(serverURL + '/cuota', cuota);
  // }

  // update(cuota: Partial<ICuota>): Observable<number> {
  //   return this.oHttp.put<number>(serverURL + '/cuota', cuota);
  // }

  // empty(): Observable<number> {
  //   return this.oHttp.delete<number>(serverURL + '/cuota/empty');
  // }


}
