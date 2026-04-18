export function renderInscripciones(lista, estudiantes, cursos, eliminarFn) {
    const contenedor = document.getElementById("listaInscripciones");
    contenedor.innerHTML = "";
    lista.forEach(ins => {
        const estudiante = estudiantes.find(e => e.id === ins.estudianteId);
        const curso = cursos.find(c => c.id === ins.cursoId);
        const li = document.createElement("li");
        li.innerHTML = `
            ${estudiante === null || estudiante === void 0 ? void 0 : estudiante.nombre} → ${curso === null || curso === void 0 ? void 0 : curso.nombre}
            <button>X</button>
        `;
        li.querySelector("button").addEventListener("click", () => {
            eliminarFn(ins.id);
        });
        contenedor.appendChild(li);
    });
}
