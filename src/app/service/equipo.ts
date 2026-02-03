import { Injectable } from '@angular/core';
import { IEquipo } from '../model/equipo';
import { Observable } from 'rxjs';
import { IPage } from '../model/plist';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    rpp: number,
    order: string = '',
    direction: string = '',
    nombre: string = '',
    id_categoria: number = 0,
  ): Observable<IPage<IEquipo>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    
    let url = `${serverURL}/equipo?page=${page}&size=${rpp}&sort=${order},${direction}`;
    
    if (id_categoria > 0) {
      url += `&idCuota=${id_categoria}`;
    }
    
    if (nombre && nombre.length > 0) {
      url += `&description=${nombre}`;
    }
    
    return this.oHttp.get<IPage<IEquipo>>(url);
  }

  // get(id: number): Observable<IEquipo> {
  //   return this.oHttp.get<IEquipo>(serverURL + '/equipo/' + id);
  // }

  // create(equipo: Partial<IEquipo>): Observable<number> {
  //   return this.oHttp.post<number>(serverURL + '/equipo', equipo);
  // }

  // update(equipo: Partial<IEquipo>): Observable<number> {
  //   return this.oHttp.put<number>(serverURL + '/equipo', equipo);
  // }

  // delete(id: number): Observable<number> {
  //   return this.oHttp.delete<number>(serverURL + '/equipo/' + id);
  // }

  // empty(): Observable<number> {
  //   return this.oHttp.delete<number>(serverURL + '/equipo/empty');
  // }
}
