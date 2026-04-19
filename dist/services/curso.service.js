import { guardar, obtener } from "../utils/storage.js";
export class CursoService {
    constructor() {
        this.cursos = obtener("cursos");
    }
    agregar(curso) {
        this.cursos.push(curso);
        guardar("cursos", this.cursos);
    }
    obtenerTodos() {
        return this.cursos;
    }
    eliminar(id) {
        this.cursos = this.cursos.filter(c => c.id !== id);
        guardar("cursos", this.cursos);
    }
    cambiarEstado(id) {
        const curso = this.cursos.find(c => c.id === id);
        if (curso) {
            curso.estado = curso.estado === "disponible" ? "cerrado" : "disponible";
            guardar("cursos", this.cursos);
        }
    }
}
