import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { IPage } from '../../../model/plist';
import { IClub } from '../../../model/club';
import { ClubService } from '../../../service/club';

import { Paginacion } from '../../shared/paginacion/paginacion';
import { BotoneraRpp } from '../../shared/botonera-rpp/botonera-rpp';
import { DatetimePipe } from '../../../pipe/datetime-pipe';

@Component({
  selector: 'app-club-plist',
  standalone: true,
  imports: [Paginacion, BotoneraRpp, DatetimePipe],
  templateUrl: './club-plist.html',
  styleUrl: './club-plist.css',
})
export class ClubPlist implements OnInit {

  oPage: IPage<IClub> | null = null;

  numPage: number = 0;
  numRpp: number = 5;

  orderField: string = 'id';
  orderDirection: string = 'asc';

  constructor(
    private oClubService: ClubService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oClubService
      .getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection)
      .subscribe({
        next: (data: IPage<IClub>) => {
          this.oPage = data;
          this.cdr.detectChanges();

          // seguridad: si nos salimos de páginas válidas
          if (this.numPage > 0 && this.numPage >= data.totalPages) {
            this.numPage = data.totalPages - 1;
            this.getPage();
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
        },
      });
  }

  onOrder(order: string) {
    if (this.orderField === order) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = order;
      this.orderDirection = 'asc';
    }
    this.numPage = 0;
    this.getPage();
    return false;
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.getPage();
    return false;
  }
}
