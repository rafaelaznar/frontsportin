export interface IUsuario {
  id: number
}

export interface IFactura {
  id: number;
  fecha: Date;
  usuario : IUsuario;
}
