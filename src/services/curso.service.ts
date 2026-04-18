import { Curso } from "../models/curso.js";

export class CursoService {
    private cursos: Curso[] = [];

    agregar(curso: Curso): void {
        this.cursos.push(curso);
    }

    obtenerTodos(): Curso[] {
        return this.cursos;
    }

    eliminar(id: number): void {
        this.cursos = this.cursos.filter(c => c.id !== id);
    }
}