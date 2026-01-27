export interface ITemporada {
    id: number
    descripcion: string
    club: IClub
}

export interface IClub {
    id: number
    nombre: string
    direccion: string
    telefono: string
    fecha_alta: string
    imagen: string
}
