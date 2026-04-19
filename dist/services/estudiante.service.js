import { guardar, obtener } from "../utils/storage.js";
export class EstudianteService {
    constructor() {
        this.estudiantes = obtener("estudiantes");
    }
    agregar(est) {
        this.estudiantes.push(est);
        guardar("estudiantes", this.estudiantes);
    }
    obtenerTodos() {
        return this.estudiantes;
    }
    eliminar(id) {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
        guardar("estudiantes", this.estudiantes);
    }
    cambiarEstado(id) {
        const estudiante = this.estudiantes.find(e => e.id === id);
        if (estudiante) {
            estudiante.estado = estudiante.estado === "activo" ? "inactivo" : "activo";
            guardar("estudiantes", this.estudiantes);
        }
    }
}
