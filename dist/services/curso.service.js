export class CursoService {
    constructor() {
        this.cursos = [];
    }
    agregar(curso) {
        this.cursos.push(curso);
    }
    obtenerTodos() {
        return this.cursos;
    }
    eliminar(id) {
        this.cursos = this.cursos.filter(c => c.id !== id);
    }
}
