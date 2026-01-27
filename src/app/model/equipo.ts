import { IPage } from './plist';

export interface ICategoria {
  id: number;
  nombre?: string;
  temporada?: any;
}

export interface IUsuario {
  id: number;
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  username?: string;
  // nota: el backend puede devolver password; no lo uses en UI
  password?: string;
  [key: string]: any;
}

export interface IEquipo {
  id?: number;
  nombre: string;
  categoria: ICategoria;
  entrenador: IUsuario;
  jugadores?: number;
  cuotas?: number;
  ligas?: number;
}

export type IPageEquipo = IPage<IEquipo>;
