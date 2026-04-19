import { EstudianteService } from "./services/estudiante.service.js";
import { renderEstudiantes } from "./ui/render.estudiantes.js";
import { CursoService } from "./services/curso.service.js";
import { renderCursos } from "./ui/render.cursos.js";
import { InscripcionService } from "./services/inscripcion.service.js";
import { renderInscripciones } from "./ui/render.inscripciones.js";
const servicio = new EstudianteService();
const cursoService = new CursoService();
const inscripcionService = new InscripcionService();
let contadorId = servicio.obtenerTodos().length + 1;
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
    if (!nombreInput.value || !emailInput.value) {
        alert("Campos vacíos");
        return;
    }
    const duplicado = servicio.obtenerTodos().some(e => e.correo === emailInput.value);
    if (duplicado) {
        alert("Correo ya registrado");
        return;
    }
    const nuevo = {
        id: contadorId++,
        nombre: nombreInput.value,
        correo: emailInput.value,
        estado: "activo",
        edad: 0,
        carrera: ""
    };
    servicio.agregar(nuevo);
    actualizarUI();
    actualizarSelects();
    nombreInput.value = "";
    emailInput.value = "";
});
function actualizarUI() {
    renderEstudiantes(servicio.obtenerTodos(), (id) => {
        servicio.eliminar(id);
        actualizarUI();
        actualizarSelects();
    });
}
window.cambiarEstadoEstudiante = (id) => {
    servicio.cambiarEstado(id);
    actualizarUI();
    actualizarSelects();
};
let contadorCursoId = cursoService.obtenerTodos().length + 1;
const nombreCursoInput = document.getElementById("nombreCurso");
const creditosInput = document.getElementById("creditos");
const btnAgregarCurso = document.getElementById("btnAgregarCurso");
btnAgregarCurso.addEventListener("click", () => {
    if (!nombreCursoInput.value || !creditosInput.value) {
        alert("Campos vacíos");
        return;
    }
    const nuevo = {
        id: contadorCursoId++,
        nombre: nombreCursoInput.value,
        sigla: "",
        docente: "",
        cupoMaximo: Number(creditosInput.value),
        estado: "disponible"
    };
    cursoService.agregar(nuevo);
    actualizarCursos();
    actualizarSelects();
    nombreCursoInput.value = "";
    creditosInput.value = "";
});
function actualizarCursos() {
    renderCursos(cursoService.obtenerTodos(), (id) => {
        cursoService.eliminar(id);
        actualizarCursos();
        actualizarSelects();
    });
}
window.cambiarEstadoCurso = (id) => {
    cursoService.cambiarEstado(id);
    actualizarCursos();
    actualizarSelects();
};
let contadorInsId = inscripcionService.obtenerTodos().length + 1;
const selectEstudiante = document.getElementById("selectEstudiante");
const selectCurso = document.getElementById("selectCurso");
const btnInscribir = document.getElementById("btnInscribir");
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
    const duplicado = inscripcionService.obtenerTodos().some(i => i.estudianteId === estudianteId && i.cursoId === cursoId);
    if (duplicado) {
        alert("Ya inscrito");
        return;
    }
    const nueva = {
        id: contadorInsId++,
        estudianteId,
        cursoId
    };
    inscripcionService.agregar(nueva);
    actualizarInscripciones();
});
function actualizarSelects() {
    selectEstudiante.innerHTML = "";
    servicio.obtenerTodos().forEach(e => {
        const option = document.createElement("option");
        option.value = e.id.toString();
        option.text = `${e.nombre} (${e.estado})`;
        selectEstudiante.appendChild(option);
    });
    selectCurso.innerHTML = "";
    cursoService.obtenerTodos().forEach(c => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.text = `${c.nombre} (${c.estado})`;
        selectCurso.appendChild(option);
    });
}
function actualizarInscripciones() {
    renderInscripciones(inscripcionService.obtenerTodos(), servicio.obtenerTodos(), cursoService.obtenerTodos(), (id) => {
        inscripcionService.eliminar(id);
        actualizarInscripciones();
    });
}
actualizarUI();
actualizarCursos();
actualizarSelects();
actualizarInscripciones();
