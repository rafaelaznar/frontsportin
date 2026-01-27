import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITemporada, IPage } from "../model/temporada";
import { serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})

export class TemporadaService {

    constructor(private oHttp: HttpClient) { }

    getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<ITemporada>> {
        if (order === '') {
        order = 'id';
        }
        if (direction === '') {
        direction = 'asc';
        }
        return this.oHttp.get<IPage<ITemporada>>(serverURL + `/temporada?page=${page}&size=${rpp}&sort=${order},${direction}`);
    }

}