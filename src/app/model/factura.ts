export interface IUsuario {
   id: number;
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  username?: string;
  password?: string;
  [key: string]: any; 
}


export interface IFactura {
  id: number;
  fecha: string;
  usuarios : IUsuario;
  
}