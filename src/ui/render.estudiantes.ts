import { Estudiante } from "../models/estudiante.js";

export function renderEstudiantes(lista: Estudiante[], eliminarFn: (id: number) => void) {
    const contenedor = document.getElementById("listaEstudiantes")!;
    contenedor.innerHTML = "";

    lista.forEach(est => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${est.nombre} - ${est.email}
            <button data-id="${est.id}">X</button>
        `;

        li.querySelector("button")!.addEventListener("click", () => {
            eliminarFn(est.id);
        });

        contenedor.appendChild(li);
    });
}