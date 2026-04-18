export class EstudianteService {
    constructor() {
        this.estudiantes = [];
    }
    agregar(est) {
        this.estudiantes.push(est);
    }
    obtenerTodos() {
        return this.estudiantes;
    }
    eliminar(id) {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
    }
}
