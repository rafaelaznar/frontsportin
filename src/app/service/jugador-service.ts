import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUsuario {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  username: string;
}

export interface IEquipo {
  id: number;
  nombre: string;
}

export interface IJugador {
  id: number;
  dorsal: number;
  posicion: string;
  capitan: boolean;
  imagen?: string;
  usuario: IUsuario;
  equipo: IEquipo;
  pagos?: number;
}

export interface IJugadorPage {
  content: IJugador[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private apiUrl = 'http://localhost:8089/jugador';

  constructor(private http: HttpClient) {}

  getPage(
    page: number,
    size: number,
    sort: string = 'id',
    direction: string = 'asc'
  ): Observable<IJugadorPage> {
    return this.http.get<IJugadorPage>(
      `${this.apiUrl}?page=${page}&size=${size}&sort=${sort},${direction}`
    );
  }

  getById(id: number): Observable<IJugador> {
    return this.http.get<IJugador>(`${this.apiUrl}/${id}`);
  }

  getByPosicion(
    posicion: string,
    page: number,
    size: number,
    sort: string = 'id',
    direction: string = 'asc'
  ): Observable<IJugadorPage> {
    return this.http.get<IJugadorPage>(
      `${this.apiUrl}/posicion/${posicion}?page=${page}&size=${size}&sort=${sort},${direction}`
    );
  }

  getByUsuario(
    idUsuario: number,
    page: number,
    size: number,
    sort: string = 'id',
    direction: string = 'asc'
  ): Observable<IJugadorPage> {
    return this.http.get<IJugadorPage>(
      `${this.apiUrl}/usuario/${idUsuario}?page=${page}&size=${size}&sort=${sort},${direction}`
    );
  }

  getByEquipo(
    idEquipo: number,
    page: number,
    size: number,
    sort: string = 'id',
    direction: string = 'asc'
  ): Observable<IJugadorPage> {
    return this.http.get<IJugadorPage>(
      `${this.apiUrl}/equipo/${idEquipo}?page=${page}&size=${size}&sort=${sort},${direction}`
    );
  }

  create(jugador: Partial<IJugador>): Observable<IJugador> {
    return this.http.post<IJugador>(this.apiUrl, jugador);
  }

  update(id: number, jugador: Partial<IJugador>): Observable<IJugador> {
    return this.http.put<IJugador>(`${this.apiUrl}/${id}`, jugador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
