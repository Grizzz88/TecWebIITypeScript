import { Estudiante } from "../models/estudiante.js";
import { guardar, obtener } from "../utils/storage.js";


export class EstudianteService {
    private estudiantes: Estudiante[] = obtener("estudiantes")
    agregar(est: Estudiante): void {
        this.estudiantes.push(est);
        guardar("estudiantes", this.estudiantes);
    }

    obtenerTodos(): Estudiante[] {
        return this.estudiantes;
    }

    eliminar(id: number): void {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
        guardar("estudiantes", this.estudiantes);
    }
    
    cambiarEstado(id: number): void {
    const estudiante = this.estudiantes.find(e => e.id === id);
    if (estudiante) {
        estudiante.estado = estudiante.estado === "activo" ? "inactivo" : "activo";
        guardar("estudiantes", this.estudiantes);
        }
    }
}