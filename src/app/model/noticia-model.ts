export interface noticiaModel{
  id: number;
  titulo: string;
  contenido: string;
  fecha: Date;
  imagen: any | null;
  id_club: number;
}

// Temporales

export interface IClubModel {
  id: number;
  nombre?: string;
}

export interface IPuntuacionModel {
  id: number;
  puntuacion: number;
}

export interface IComentarioModel {
  id: number;
  contenido: string;
}
