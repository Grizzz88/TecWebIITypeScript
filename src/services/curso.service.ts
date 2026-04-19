import { Curso } from "../models/curso.js";
import { guardar, obtener } from "../utils/storage.js";

export class CursoService {
    private cursos: Curso[] = obtener("cursos");

    agregar(curso: Curso): void {
        this.cursos.push(curso);
        guardar("cursos", this.cursos);
    }

    obtenerTodos(): Curso[] {
        return this.cursos;
    }

    eliminar(id: number): void {
        this.cursos = this.cursos.filter(c => c.id !== id);
        guardar("cursos", this.cursos);
    }

    actualizar(id: number, cambios: Omit<Curso, "id">): void {
        const indice = this.cursos.findIndex(c => c.id === id);
        if (indice >= 0) {
            this.cursos[indice] = { id, ...cambios };
            guardar("cursos", this.cursos);
        }
    }

    obtenerPorId(id: number): Curso | undefined {
        return this.cursos.find(c => c.id === id);
    }

    reemplazarTodos(lista: Curso[]): void {
        this.cursos = [...lista];
        guardar("cursos", this.cursos);
    }
    
    cambiarEstado(id: number): void {
        const curso = this.cursos.find(c => c.id === id);
        if (curso) {
            curso.estado = curso.estado === "disponible" ? "cerrado" : "disponible";
            guardar("cursos", this.cursos);
        }
    }
}