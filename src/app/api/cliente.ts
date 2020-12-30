import { Tarjeta } from './tarjeta';

export interface Cliente {
    apellido: string;
    celular: number;
    contrasena: string;
    email: string;
    foto?: string;
    id_cliente: number;
    nombre: string;
    tarjetas?: Array<Tarjeta>;
}
