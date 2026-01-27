export interface noticiaModel{
  id: number;
  titulo: string;
  contenido: string;
  fecha: Date;
  imagen: string | null;
  id_club?: number;
  club?: { id: number; nombre?: string }
}
