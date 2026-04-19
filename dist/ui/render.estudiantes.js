export function renderEstudiantes(lista, eliminarFn) {
    const contenedor = document.getElementById("listaEstudiantes");
    contenedor.innerHTML = "";
    lista.forEach(est => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${est.nombre} - ${est.correo}
            <button data-id="${est.id}">X</button>
        `;
        li.querySelector("button").addEventListener("click", () => {
            eliminarFn(est.id);
        });
        contenedor.appendChild(li);
    });
}
