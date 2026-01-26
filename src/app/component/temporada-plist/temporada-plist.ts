import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { DatetimePipe } from "../../../pipe/datetime-pipe";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-temporada-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, DatetimePipe, MatDialogModule, MatSnackBarModule],
  templateUrl: './temporada-plist.html',
  styleUrl: './temporada-plist.css',
})
export class TemporadaPlist {

  oPage: IPage<IBlog> | null = null;
  numPage: number = 0;
  numRpp: number = 5;

  
}
