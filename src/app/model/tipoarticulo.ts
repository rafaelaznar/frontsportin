export interface ITipoarticulo {
  id: number;
  descripcion: string;
  club: IClub;
}

export interface IClub {
  id: number;
  nombre: string; // Assuming club has id and nombre, adjust if needed
}
