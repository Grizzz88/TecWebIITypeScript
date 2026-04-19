import { Inscripcion } from "../models/inscripcion.js";
import { guardar, obtener } from "../utils/storage.js";

export class InscripcionService {
private inscripciones: Inscripcion[] = obtener("inscripciones");

    agregar(ins: Inscripcion): void {
        this.inscripciones.push(ins);
        guardar("inscripciones", this.inscripciones);
    }

    obtenerTodos(): Inscripcion[] {
        return this.inscripciones;
    }

    eliminar(id: number): void {
        this.inscripciones = this.inscripciones.filter(i => i.id !== id);
        guardar("inscripciones", this.inscripciones);
    }
}