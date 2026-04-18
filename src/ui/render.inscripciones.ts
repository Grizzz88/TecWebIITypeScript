import { Inscripcion } from "../models/inscripcion.js";
import { Estudiante } from "../models/estudiante.js";
import { Curso } from "../models/curso.js";

export function renderInscripciones(
    lista: Inscripcion[],
    estudiantes: Estudiante[],
    cursos: Curso[],
    eliminarFn: (id: number) => void
) {
    const contenedor = document.getElementById("listaInscripciones")!;
    contenedor.innerHTML = "";

    lista.forEach(ins => {
        const estudiante = estudiantes.find(e => e.id === ins.estudianteId);
        const curso = cursos.find(c => c.id === ins.cursoId);

        const li = document.createElement("li");

        li.innerHTML = `
            ${estudiante?.nombre} → ${curso?.nombre}
            <button>X</button>
        `;

        li.querySelector("button")!.addEventListener("click", () => {
            eliminarFn(ins.id);
        });

        contenedor.appendChild(li);
    });
}