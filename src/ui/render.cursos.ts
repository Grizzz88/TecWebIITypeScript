import { Curso } from "../models/curso.js";

export function renderCursos(lista: Curso[], eliminarFn: (id: number) => void) {
    const contenedor = document.getElementById("listaCursos")!;
    contenedor.innerHTML = "";

    lista.forEach(curso => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${curso.nombre} - ${curso.creditos} créditos
            <button data-id="${curso.id}">X</button>
        `;

        li.querySelector("button")!.addEventListener("click", () => {
            eliminarFn(curso.id);
        });

        contenedor.appendChild(li);
    });
}