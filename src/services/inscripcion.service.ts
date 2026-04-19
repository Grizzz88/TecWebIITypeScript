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

    cambiarEstado(id: number): void {
        const inscripcion = this.inscripciones.find(i => i.id === id);
        if (inscripcion) {
            inscripcion.estado = inscripcion.estado === "activa" ? "cancelada" : "activa";
            guardar("inscripciones", this.inscripciones);
        }
    }

    obtenerActivasPorCurso(cursoId: number): Inscripcion[] {
        return this.inscripciones.filter(i => i.cursoId === cursoId && i.estado === "activa");
    }

    obtenerPorEstudiante(estudianteId: number): Inscripcion[] {
        return this.inscripciones.filter(i => i.estudianteId === estudianteId);
    }

    obtenerPorCurso(cursoId: number): Inscripcion[] {
        return this.inscripciones.filter(i => i.cursoId === cursoId);
    }

    reemplazarTodos(lista: Inscripcion[]): void {
        this.inscripciones = [...lista];
        guardar("inscripciones", this.inscripciones);
    }
}