import { Component, computed, inject, Input, signal } from '@angular/core';
import { IPage } from '../../../model/plist';
import { IArticulo } from '../../../model/articulo';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { debounceTimeSearch } from '../../../environment/environment';
import { ArticuloService } from '../../../service/articulo';
import { HttpErrorResponse } from '@angular/common/http';
import { BotoneraRpp } from '../../shared/botonera-rpp/botonera-rpp';
import { Paginacion } from '../../shared/paginacion/paginacion';
import { RouterLink } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim-pipe';
import { MatDialogRef } from '@angular/material/dialog';
import { BotoneraActionsPlist } from '../../shared/botonera-actions-plist/botonera-actions-plist';

@Component({
  selector: 'app-articulo-plist-teamadmin-unrouted',
  imports: [BotoneraRpp, Paginacion, RouterLink, TrimPipe, BotoneraActionsPlist],
  templateUrl: './articulo-plist-teamadmin-unrouted.html',
  styleUrl: './articulo-plist-teamadmin-unrouted.css',
  standalone: true,
})
export class ArticuloPlistTeamAdminUnrouted {
  @Input() tipoarticulo = signal<number>(0);

  oPage = signal<IPage<IArticulo> | null>(null);
  numPage = signal<number>(0);
  numRpp = signal<number>(5);

  message = signal<string | null>(null);
  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  orderField = signal<string>('id');
  orderDirection = signal<'asc' | 'desc'>('asc');

  descripcion = signal<string>('');
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  private oArticuloService = inject(ArticuloService);
  private dialogRef = inject(MatDialogRef<ArticuloPlistTeamAdminUnrouted>, { optional: true });

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(debounceTimeSearch), distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        this.descripcion.set(searchTerm);
        this.numPage.set(0);
        this.getPage();
      });

    this.getPage();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  getPage(): void {
    this.oArticuloService
      .getPage(
        this.numPage(),
        this.numRpp(),
        this.orderField(),
        this.orderDirection(),
        this.descripcion(),
        this.tipoarticulo(),
      )
      .subscribe({
        next: (data: IPage<IArticulo>) => {
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

  goToPage(numPage: number): void {
    this.numPage.set(numPage);
    this.getPage();
  }

  onRppChange(n: number): void {
    this.numRpp.set(n);
    this.numPage.set(0);
    this.getPage();
  }

  onSearchDescription(value: string): void {
    this.searchSubject.next(value);
  }

  isDialogMode(): boolean {
    return !!this.dialogRef;
  }

  onSelect(articulo: IArticulo): void {
    this.dialogRef?.close(articulo);
  }
}
