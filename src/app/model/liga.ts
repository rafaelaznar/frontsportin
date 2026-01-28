export interface ILiga {
    id: number;
    nombre: string;
    equipo: IEquipo;
    partidos: number;
}

export interface IEquipo {
    id: number;
    nombre?: string; // añadido: nombre del equipo (opcional si el backend no lo manda)
}