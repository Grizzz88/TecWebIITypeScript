export class InscripcionService {
    constructor() {
        this.inscripciones = [];
    }
    agregar(ins) {
        this.inscripciones.push(ins);
    }
    obtenerTodos() {
        return this.inscripciones;
    }
    eliminar(id) {
        this.inscripciones = this.inscripciones.filter(i => i.id !== id);
    }
}
