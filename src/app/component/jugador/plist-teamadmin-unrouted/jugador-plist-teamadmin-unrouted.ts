import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, computed, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { debounceTimeSearch, serverURL } from '../../../environment/environment';
import { IJugador } from '../../../model/jugador';
import { IPage } from '../../../model/plist';
import { TrimPipe } from '../../../pipe/trim-pipe';
import { JugadorService } from '../../../service/jugador-service';
import { BotoneraActionsPlist } from '../../shared/botonera-actions-plist/botonera-actions-plist';
import { BotoneraRpp } from '../../shared/botonera-rpp/botonera-rpp';
import { Paginacion } from '../../shared/paginacion/paginacion';

@Component({
  standalone: true,
  selector: 'app-jugador-plist-teamadmin-unrouted',
  templateUrl: './jugador-plist-teamadmin-unrouted.html',
  styleUrls: ['./jugador-plist-teamadmin-unrouted.css'],
  imports: [CommonModule, RouterLink, TrimPipe, Paginacion, BotoneraRpp, BotoneraActionsPlist],
})
export class JugadorPlistTeamAdminUnrouted {
  @Input() usuario = signal<number>(0);
  @Input() equipo = signal<number>(0);

  oPage = signal<IPage<IJugador> | null>(null);
  numPage = signal<number>(0);
  numRpp = signal<number>(6);

  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  orderField = signal<string>('id');
  orderDirection = signal<'asc' | 'desc'>('asc');

  private searchSubject = new Subject<string>();
  posicion = signal<string>('');
  private searchSubscription?: Subscription;

  private oJugadorService = inject(JugadorService);
  private dialogRef = inject(MatDialogRef<JugadorPlistTeamAdminUnrouted>, { optional: true });

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(debounceTimeSearch), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.posicion.set(searchTerm);
        this.numPage.set(0);
        this.getPage();
      });

    this.getPage();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  getPage(): void {
    this.oJugadorService
      .getPage(
        this.numPage(),
        this.numRpp(),
        this.orderField(),
        this.orderDirection(),
        this.posicion(),
        this.usuario(),
        this.equipo(),
      )
      .subscribe({
        next: (data: IPage<IJugador>) => {
          this.oPage.set(data);
          if (this.numPage() > 0 && this.numPage() >= data.totalPages) {
            this.numPage.set(data.totalPages - 1);
            this.getPage();
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  onRppChange(rpp: number): void {
    this.numRpp.set(rpp);
    this.numPage.set(0);
    this.getPage();
  }

  goToPage(page: number): void {
    this.numPage.set(page);
    this.getPage();
  }

  onSearchPosicion(value: string): void {
    this.searchSubject.next(value);
  }

  onOrder(order: string): void {
    if (this.orderField() === order) {
      this.orderDirection.set(this.orderDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.orderField.set(order);
      this.orderDirection.set('asc');
    }
    this.numPage.set(0);
    this.getPage();
  }

  isDialogMode(): boolean {
    return !!this.dialogRef;
  }

  onSelect(jugador: IJugador): void {
    this.dialogRef?.close(jugador);
  }

  getImagenUrl(imagen: string | null): string {
    if (!imagen) {
      return '';
    }
    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }
    return `${serverURL}/${imagen}`;
  }
}
