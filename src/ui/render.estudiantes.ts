import { Estudiante } from "../models/estudiante.js";

type AccionesEstudiante = {
    eliminar: (id: number) => void;
    editar: (id: number) => void;
    cambiarEstado: (id: number) => void;
};

export function renderEstudiantes(lista: Estudiante[], acciones: AccionesEstudiante) {
    const tbody = document.getElementById("listaEstudiantes")!;
    tbody.innerHTML = "";

    lista.forEach(est => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${est.id}</td>
            <td>${est.nombre}</td>
            <td>${est.correo}</td>
            <td>${est.edad}</td>
            <td>${est.carrera}</td>
            <td>${est.estado}</td>
            <td>
                <button class="btn-accion" data-action="editar">Editar</button>
                <button class="btn-accion" data-action="estado">Cambiar estado</button>
                <button class="btn-accion btn-peligro" data-action="eliminar">Eliminar</button>
            </td>
        `;

        tr.querySelector('[data-action="editar"]')!.addEventListener("click", () => acciones.editar(est.id));
        tr.querySelector('[data-action="estado"]')!.addEventListener("click", () => acciones.cambiarEstado(est.id));
        tr.querySelector('[data-action="eliminar"]')!.addEventListener("click", () => acciones.eliminar(est.id));

        tbody.appendChild(tr);
    });
}