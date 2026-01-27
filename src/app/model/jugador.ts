export interface Jugador {
  id: number;
  dorsal: number;
  posicion: string;
  capitan: boolean;
  imagen: string | null;
  usuario: { id: number };
  equipo: { id: number };
}

@Component({
  selector: 'app-jugador-plist',
  templateUrl: './jugador-plist.component.html',
  styleUrls: ['./jugador-plist.component.css']
})
export class JugadorPlistComponent {

  oPage!: {
    content: Jugador[];
    totalElements: number;
    totalPages: number;
  };

}
function Component(arg0: { selector: string; templateUrl: string; styleUrls: string[]; }): (target: typeof JugadorPlistComponent) => void | typeof JugadorPlistComponent {
    throw new Error("Funcion no implementada.");
}

