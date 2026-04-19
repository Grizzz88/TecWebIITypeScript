export type EstadoInscripcion = "activa" | "cancelada";

export interface Inscripcion {
    id: number;
    estudianteId: number;
    cursoId: number;
    fecha: string;
    estado: EstadoInscripcion;
}