import { guardar, obtener } from "../utils/storage.js";
export class InscripcionService {
    constructor() {
        this.inscripciones = obtener("inscripciones");
    }
    agregar(ins) {
        this.inscripciones.push(ins);
        guardar("inscripciones", this.inscripciones);
    }
    obtenerTodos() {
        return this.inscripciones;
    }
    eliminar(id) {
        this.inscripciones = this.inscripciones.filter(i => i.id !== id);
        guardar("inscripciones", this.inscripciones);
    }
}
