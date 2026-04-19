export function renderCursos(lista, eliminarFn) {
    const contenedor = document.getElementById("listaCursos");
    contenedor.innerHTML = "";
    lista.forEach(curso => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${curso.nombre} - ${curso.cupoMaximo} créditos
            <button data-id="${curso.id}">X</button>
        `;
        li.querySelector("button").addEventListener("click", () => {
            eliminarFn(curso.id);
        });
        contenedor.appendChild(li);
    });
}
