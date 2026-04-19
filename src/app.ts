import { EstudianteService } from "./services/estudiante.service.js";
import { renderEstudiantes } from "./ui/render.estudiantes.js";
import { Estudiante, EstadoEstudiante } from "./models/estudiante.js";

import { CursoService } from "./services/curso.service.js";
import { renderCursos } from "./ui/render.cursos.js";
import { Curso, EstadoCurso } from "./models/curso.js";

import { InscripcionService } from "./services/inscripcion.service.js";
import { renderInscripciones } from "./ui/render.inscripciones.js";

const servicio = new EstudianteService();
const cursoService = new CursoService();
const inscripcionService = new InscripcionService();

let contadorId = servicio.obtenerTodos().length + 1;
let contadorCursoId = cursoService.obtenerTodos().length + 1;
let contadorInsId = inscripcionService.obtenerTodos().length + 1;

const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const edadInput = document.getElementById("edad") as HTMLInputElement;
const carreraInput = document.getElementById("carrera") as HTMLInputElement;
const btnAgregar = document.getElementById("btnAgregar")!;

const nombreCursoInput = document.getElementById("nombreCurso") as HTMLInputElement;
const siglaInput = document.getElementById("sigla") as HTMLInputElement;
const docenteInput = document.getElementById("docente") as HTMLInputElement;
const cupoInput = document.getElementById("cupo") as HTMLInputElement;
const btnAgregarCurso = document.getElementById("btnAgregarCurso")!;

const selectEstudiante = document.getElementById("selectEstudiante") as HTMLSelectElement;
const selectCurso = document.getElementById("selectCurso") as HTMLSelectElement;
const btnInscribir = document.getElementById("btnInscribir")!;

const totalEstudiantes = document.getElementById("totalEstudiantes")!;
const totalCursos = document.getElementById("totalCursos")!;
const totalInscripciones = document.getElementById("totalInscripciones")!;

btnAgregar.addEventListener("click", () => {
    if (!nombreInput.value || !emailInput.value || !edadInput.value || !carreraInput.value) {
        alert("Campos vacíos");
        return;
    }

    const duplicado = servicio.obtenerTodos().some(
        e => e.correo === emailInput.value
    );

    if (duplicado) {
        alert("Correo ya registrado");
        return;
    }

    const nuevo: Estudiante = {
        id: contadorId++,
        nombre: nombreInput.value,
        correo: emailInput.value,
        edad: Number(edadInput.value),
        carrera: carreraInput.value,
        estado: "activo" as EstadoEstudiante
    };

    servicio.agregar(nuevo);
    actualizarTodo();

    nombreInput.value = "";
    emailInput.value = "";
    edadInput.value = "";
    carreraInput.value = "";
});

btnAgregarCurso.addEventListener("click", () => {
    if (!nombreCursoInput.value || !siglaInput.value || !docenteInput.value || !cupoInput.value) {
        alert("Campos vacíos");
        return;
    }

    const nuevo: Curso = {
        id: contadorCursoId++,
        nombre: nombreCursoInput.value,
        sigla: siglaInput.value,
        docente: docenteInput.value,
        cupoMaximo: Number(cupoInput.value),
        estado: "disponible" as EstadoCurso
    };

    cursoService.agregar(nuevo);
    actualizarTodo();

    nombreCursoInput.value = "";
    siglaInput.value = "";
    docenteInput.value = "";
    cupoInput.value = "";
});

btnInscribir.addEventListener("click", () => {
    const estudianteId = Number(selectEstudiante.value);
    const cursoId = Number(selectCurso.value);

    const estudiante = servicio.obtenerTodos().find(e => e.id === estudianteId);
    const curso = cursoService.obtenerTodos().find(c => c.id === cursoId);

    if (!estudiante || !curso) {
        alert("Datos inválidos");
        return;
    }

    if (estudiante.estado === "inactivo") {
        alert("Estudiante inactivo");
        return;
    }

    if (curso.estado === "cerrado") {
        alert("Curso cerrado");
        return;
    }

    const duplicado = inscripcionService.obtenerTodos().some(i =>
        i.estudianteId === estudianteId &&
        i.cursoId === cursoId
    );

    if (duplicado) {
        alert("Ya inscrito");
        return;
    }

    inscripcionService.agregar({
        id: contadorInsId++,
        estudianteId,
        cursoId
    });

    actualizarTodo();
});

function actualizarTodo() {
    renderEstudiantes(servicio.obtenerTodos(), eliminarEstudiante);
    renderCursos(cursoService.obtenerTodos(), eliminarCurso);
    actualizarSelects();
    actualizarInscripciones();
    actualizarStats();
}

function eliminarEstudiante(id: number) {
    servicio.eliminar(id);
    actualizarTodo();
}

function eliminarCurso(id: number) {
    cursoService.eliminar(id);
    actualizarTodo();
}

function actualizarSelects() {
    selectEstudiante.innerHTML = "";
    servicio.obtenerTodos().forEach(e => {
        const option = document.createElement("option");
        option.value = e.id.toString();
        option.textContent = `${e.nombre} (${e.estado})`;
        selectEstudiante.appendChild(option);
    });

    selectCurso.innerHTML = "";
    cursoService.obtenerTodos().forEach(c => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.textContent = `${c.nombre} (${c.estado})`;
        selectCurso.appendChild(option);
    });
}

function actualizarInscripciones() {
    renderInscripciones(
        inscripcionService.obtenerTodos(),
        servicio.obtenerTodos(),
        cursoService.obtenerTodos(),
        (id: number) => {
            inscripcionService.eliminar(id);
            actualizarTodo();
        }
    );
}

function actualizarStats() {
    totalEstudiantes.textContent = servicio.obtenerTodos().length.toString();
    totalCursos.textContent = cursoService.obtenerTodos().length.toString();
    totalInscripciones.textContent = inscripcionService.obtenerTodos().length.toString();
}

actualizarTodo();