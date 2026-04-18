import { EstudianteService } from "./services/estudiante.service.js";
import { renderEstudiantes } from "./ui/render.estudiantes.js";
import { Estudiante } from "./models/estudiante.js";

const servicio = new EstudianteService();

let contadorId = 1;

const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const btnAgregar = document.getElementById("btnAgregar") as HTMLButtonElement;

btnAgregar.addEventListener("click", () => {
    const nuevo: Estudiante = {
        id: contadorId++,
        nombre: nombreInput.value,
        email: emailInput.value
    };

    servicio.agregar(nuevo);
    actualizarUI();

    nombreInput.value = "";
    emailInput.value = "";
});

function actualizarUI() {
    renderEstudiantes(servicio.obtenerTodos(), (id) => {
        servicio.eliminar(id);
        actualizarUI();
    });
}

import { CursoService } from "./services/curso.service.js";
import { renderCursos } from "./ui/render.cursos.js";
import { Curso } from "./models/curso.js";

const cursoService = new CursoService();

let contadorCursoId = 1;

const nombreCursoInput = document.getElementById("nombreCurso") as HTMLInputElement;
const creditosInput = document.getElementById("creditos") as HTMLInputElement;
const btnAgregarCurso = document.getElementById("btnAgregarCurso") as HTMLButtonElement;

btnAgregarCurso.addEventListener("click", () => {
    const nuevo: Curso = {
        id: contadorCursoId++,
        nombre: nombreCursoInput.value,
        creditos: Number(creditosInput.value)
    };

    cursoService.agregar(nuevo);
    actualizarCursos();

    nombreCursoInput.value = "";
    creditosInput.value = "";
});

function actualizarCursos() {
    renderCursos(cursoService.obtenerTodos(), (id) => {
        cursoService.eliminar(id);
        actualizarCursos();
    });
}

import { InscripcionService } from "./services/inscripcion.service.js";
import { renderInscripciones } from "./ui/render.inscripciones.js";

const inscripcionService = new InscripcionService();

let contadorInsId = 1;

const selectEstudiante = document.getElementById("selectEstudiante") as HTMLSelectElement;
const selectCurso = document.getElementById("selectCurso") as HTMLSelectElement;
const btnInscribir = document.getElementById("btnInscribir") as HTMLButtonElement;

btnInscribir.addEventListener("click", () => {
    const nueva = {
        id: contadorInsId++,
        estudianteId: Number(selectEstudiante.value),
        cursoId: Number(selectCurso.value)
    };

    inscripcionService.agregar(nueva);
    actualizarInscripciones();
});

function actualizarSelects() {
    selectEstudiante.innerHTML = "";
    servicio.obtenerTodos().forEach(e => {
        const option = document.createElement("option");
        option.value = e.id.toString();
        option.text = e.nombre;
        selectEstudiante.appendChild(option);
    });

    selectCurso.innerHTML = "";
    cursoService.obtenerTodos().forEach(c => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.text = c.nombre;
        selectCurso.appendChild(option);
    });
}

function actualizarInscripciones() {
    renderInscripciones(
        inscripcionService.obtenerTodos(),
        servicio.obtenerTodos(),
        cursoService.obtenerTodos(),
        (id) => {
            inscripcionService.eliminar(id);
            actualizarInscripciones();
        }
    );
}
