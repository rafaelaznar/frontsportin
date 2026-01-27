export interface IUsuarioRelacion {
  id: number;
  descripcion?: string;
  nombre?: string;
}

export interface IUsuario {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  username: string;
  fechaAlta: string;
  genero: number;
  tipousuario: IUsuarioRelacion;
  rolusuario: IUsuarioRelacion;
  club: IUsuarioRelacion;
  comentarios: number;
  puntuaciones: number;
  comentarioarts: number;
  carritos: number;
  facturas: number;
}
