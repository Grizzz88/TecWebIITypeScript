import { Inscripcion } from "../models/inscripcion.js";

export class InscripcionService {
    private inscripciones: Inscripcion[] = [];

    agregar(ins: Inscripcion): void {
        this.inscripciones.push(ins);
    }

    obtenerTodos(): Inscripcion[] {
        return this.inscripciones;
    }

    eliminar(id: number): void {
        this.inscripciones = this.inscripciones.filter(i => i.id !== id);
    }
}