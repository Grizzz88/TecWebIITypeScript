import { Inscripcion } from "../models/inscripcion.js";
import { Estudiante } from "../models/estudiante.js";
import { Curso } from "../models/curso.js";

export function renderInscripciones(
    lista: Inscripcion[],
    estudiantes: Estudiante[],
    cursos: Curso[],
    cambiarEstadoFn: (id: number) => void,
    eliminarFn: (id: number) => void
) {
    const tbody = document.getElementById("listaInscripciones")!;
    tbody.innerHTML = "";

    lista.forEach(ins => {
        const estudiante = estudiantes.find(e => e.id === ins.estudianteId);
        const curso = cursos.find(c => c.id === ins.cursoId);

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${ins.id}</td>
            <td>${estudiante?.nombre ?? "No disponible"}</td>
            <td>${curso?.nombre ?? "No disponible"}</td>
            <td>${ins.fecha}</td>
            <td>${ins.estado}</td>
            <td>
                <button class="btn-accion" data-action="estado">${ins.estado === "activa" ? "Cancelar" : "Reactivar"}</button>
                <button class="btn-accion btn-peligro" data-action="eliminar">Eliminar</button>
            </td>
        `;

        tr.querySelector('[data-action="estado"]')!.addEventListener("click", () => {
            cambiarEstadoFn(ins.id);
        });
        tr.querySelector('[data-action="eliminar"]')!.addEventListener("click", () => {
            eliminarFn(ins.id);
        });

        tbody.appendChild(tr);
    });
}