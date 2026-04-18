import { Estudiante } from "../models/estudiante.js";

export class EstudianteService {
    private estudiantes: Estudiante[] = [];

    agregar(est: Estudiante): void {
        this.estudiantes.push(est);
    }

    obtenerTodos(): Estudiante[] {
        return this.estudiantes;
    }

    eliminar(id: number): void {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
    }
}