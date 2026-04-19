import { Curso } from "../models/curso.js";

type AccionesCurso = {
    eliminar: (id: number) => void;
    editar: (id: number) => void;
    cambiarEstado: (id: number) => void;
};

export function renderCursos(lista: Curso[], acciones: AccionesCurso) {
    const tbody = document.getElementById("listaCursos")!;
    tbody.innerHTML = "";

    lista.forEach(curso => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${curso.id}</td>
            <td>${curso.nombre}</td>
            <td>${curso.sigla}</td>
            <td>${curso.docente}</td>
            <td>${curso.cupoMaximo}</td>
            <td>${curso.estado}</td>
            <td>
                <button class="btn-accion" data-action="editar">Editar</button>
                <button class="btn-accion" data-action="estado">Cambiar estado</button>
                <button class="btn-accion btn-peligro" data-action="eliminar">Eliminar</button>
            </td>
        `;

        tr.querySelector('[data-action="editar"]')!.addEventListener("click", () => acciones.editar(curso.id));
        tr.querySelector('[data-action="estado"]')!.addEventListener("click", () => acciones.cambiarEstado(curso.id));
        tr.querySelector('[data-action="eliminar"]')!.addEventListener("click", () => acciones.eliminar(curso.id));

        tbody.appendChild(tr);
    });
}