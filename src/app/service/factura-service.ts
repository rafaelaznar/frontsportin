import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPage } from '../model/plist';
import { IFactura } from '../model/factura';
import { serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})

export class FacturaService {


  constructor(private oHttp: HttpClient) {}

getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<IFactura>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    return this.oHttp.get<IPage<IFactura>>(serverURL + `/factura?page=${page}&size=${rpp}&sort=${order},${direction}`);
  }
}