import { EstudianteService } from "./services/estudiante.service.js";
import { renderEstudiantes } from "./ui/render.estudiantes.js";
import { Estudiante, EstadoEstudiante } from "./models/estudiante.js";

import { CursoService } from "./services/curso.service.js";
import { renderCursos } from "./ui/render.cursos.js";
import { Curso, EstadoCurso } from "./models/curso.js";

import { InscripcionService } from "./services/inscripcion.service.js";
import { renderInscripciones } from "./ui/render.inscripciones.js";
import { Inscripcion } from "./models/inscripcion.js";
import { esCorreoValido, esNumeroPositivo } from "./utils/validators.js";

type DatosIniciales = {
    estudiantes: Estudiante[];
    cursos: Curso[];
    inscripciones: Inscripcion[];
};

const estudianteService = new EstudianteService();
const cursoService = new CursoService();
const inscripcionService = new InscripcionService();

let contadorEstudianteId = 1;
let contadorCursoId = 1;
let contadorInscripcionId = 1;

let estudianteEditandoId: number | null = null;
let cursoEditandoId: number | null = null;

const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const edadInput = document.getElementById("edad") as HTMLInputElement;
const carreraInput = document.getElementById("carrera") as HTMLInputElement;
const btnAgregar = document.getElementById("btnAgregar") as HTMLButtonElement;

const nombreCursoInput = document.getElementById("nombreCurso") as HTMLInputElement;
const siglaInput = document.getElementById("sigla") as HTMLInputElement;
const docenteInput = document.getElementById("docente") as HTMLInputElement;
const cupoInput = document.getElementById("cupo") as HTMLInputElement;
const btnAgregarCurso = document.getElementById("btnAgregarCurso") as HTMLButtonElement;

const buscarEstudianteInput = document.getElementById("buscarEstudiante") as HTMLInputElement;
const filtroEstadoEstudiante = document.getElementById("filtroEstadoEstudiante") as HTMLSelectElement;
const buscarCursoInput = document.getElementById("buscarCurso") as HTMLInputElement;
const filtroEstadoCurso = document.getElementById("filtroEstadoCurso") as HTMLSelectElement;

const selectEstudiante = document.getElementById("selectEstudiante") as HTMLSelectElement;
const selectCurso = document.getElementById("selectCurso") as HTMLSelectElement;
const btnInscribir = document.getElementById("btnInscribir") as HTMLButtonElement;

const selectRelacionEstudiante = document.getElementById("selectRelacionEstudiante") as HTMLSelectElement;
const selectRelacionCurso = document.getElementById("selectRelacionCurso") as HTMLSelectElement;
const cursosDeEstudiante = document.getElementById("cursosDeEstudiante") as HTMLUListElement;
const estudiantesDeCurso = document.getElementById("estudiantesDeCurso") as HTMLUListElement;

const totalEstudiantes = document.getElementById("totalEstudiantes") as HTMLSpanElement;
const totalCursos = document.getElementById("totalCursos") as HTMLSpanElement;
const totalInscripciones = document.getElementById("totalInscripciones") as HTMLSpanElement;
const cursoMasInscritos = document.getElementById("cursoMasInscritos") as HTMLSpanElement;
const estudiantesActivos = document.getElementById("estudiantesActivos") as HTMLSpanElement;
const cursosCerrados = document.getElementById("cursosCerrados") as HTMLSpanElement;

function normalizarTexto(texto: string): string {
    return texto.trim().toLowerCase();
}

function recalcularContadores(): void {
    contadorEstudianteId = Math.max(0, ...estudianteService.obtenerTodos().map(e => e.id)) + 1;
    contadorCursoId = Math.max(0, ...cursoService.obtenerTodos().map(c => c.id)) + 1;
    contadorInscripcionId = Math.max(0, ...inscripcionService.obtenerTodos().map(i => i.id)) + 1;
}

function limpiarFormularioEstudiante(): void {
    nombreInput.value = "";
    emailInput.value = "";
    edadInput.value = "";
    carreraInput.value = "";
    estudianteEditandoId = null;
    btnAgregar.textContent = "Agregar estudiante";
}

function limpiarFormularioCurso(): void {
    nombreCursoInput.value = "";
    siglaInput.value = "";
    docenteInput.value = "";
    cupoInput.value = "";
    cursoEditandoId = null;
    btnAgregarCurso.textContent = "Agregar curso";
}

function validarEstudiante(nombre: string, correo: string, edad: number, carrera: string, idActual?: number): boolean {
    if (!nombre || !correo || !carrera || !Number.isFinite(edad)) {
        alert("Todos los campos del estudiante son obligatorios.");
        return false;
    }

    if (!esCorreoValido(correo)) {
        alert("El correo no tiene un formato valido.");
        return false;
    }

    if (!esNumeroPositivo(edad)) {
        alert("La edad debe ser mayor a 0.");
        return false;
    }

    const correoDuplicado = estudianteService.obtenerTodos().some(e =>
        normalizarTexto(e.correo) === normalizarTexto(correo) && e.id !== idActual
    );

    if (correoDuplicado) {
        alert("Ya existe un estudiante con ese correo.");
        return false;
    }

    return true;
}

function validarCurso(nombre: string, sigla: string, docente: string, cupoMaximo: number, idActual?: number): boolean {
    if (!nombre || !sigla || !docente || !Number.isFinite(cupoMaximo)) {
        alert("Todos los campos del curso son obligatorios.");
        return false;
    }

    if (!esNumeroPositivo(cupoMaximo)) {
        alert("El cupo maximo debe ser mayor a 0.");
        return false;
    }

    const siglaDuplicada = cursoService.obtenerTodos().some(c =>
        normalizarTexto(c.sigla) === normalizarTexto(sigla) && c.id !== idActual
    );

    if (siglaDuplicada) {
        alert("La sigla del curso ya existe.");
        return false;
    }

    return true;
}

btnAgregar.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();
    const correo = emailInput.value.trim();
    const edad = Number(edadInput.value);
    const carrera = carreraInput.value.trim();

    if (!validarEstudiante(nombre, correo, edad, carrera, estudianteEditandoId ?? undefined)) {
        return;
    }

    const payload: Omit<Estudiante, "id"> = {
        nombre,
        correo,
        edad,
        carrera,
        estado: "activo" as EstadoEstudiante
    };

    if (estudianteEditandoId === null) {
        estudianteService.agregar({ id: contadorEstudianteId++, ...payload });
    } else {
        const estudianteActual = estudianteService.obtenerPorId(estudianteEditandoId);
        estudianteService.actualizar(estudianteEditandoId, {
            ...payload,
            estado: estudianteActual?.estado ?? "activo"
        });
    }

    limpiarFormularioEstudiante();
    actualizarTodo();
});

btnAgregarCurso.addEventListener("click", () => {
    const nombre = nombreCursoInput.value.trim();
    const sigla = siglaInput.value.trim();
    const docente = docenteInput.value.trim();
    const cupoMaximo = Number(cupoInput.value);

    if (!validarCurso(nombre, sigla, docente, cupoMaximo, cursoEditandoId ?? undefined)) {
        return;
    }

    const payload: Omit<Curso, "id"> = {
        nombre,
        sigla,
        docente,
        cupoMaximo,
        estado: "disponible" as EstadoCurso
    };

    if (cursoEditandoId === null) {
        cursoService.agregar({ id: contadorCursoId++, ...payload });
    } else {
        const cursoActual = cursoService.obtenerPorId(cursoEditandoId);
        cursoService.actualizar(cursoEditandoId, {
            ...payload,
            estado: cursoActual?.estado ?? "disponible"
        });
    }

    limpiarFormularioCurso();
    actualizarTodo();
});

btnInscribir.addEventListener("click", () => {
    const estudianteId = Number(selectEstudiante.value);
    const cursoId = Number(selectCurso.value);

    const estudiante = estudianteService.obtenerPorId(estudianteId);
    const curso = cursoService.obtenerPorId(cursoId);

    if (!estudiante || !curso) {
        alert("Debes seleccionar estudiante y curso validos.");
        return;
    }

    if (estudiante.estado === "inactivo") {
        alert("No se puede inscribir un estudiante inactivo.");
        return;
    }

    if (curso.estado === "cerrado") {
        alert("No se puede inscribir en un curso cerrado.");
        return;
    }

    const duplicada = inscripcionService.obtenerTodos().some(i =>
        i.estudianteId === estudianteId && i.cursoId === cursoId && i.estado === "activa"
    );

    if (duplicada) {
        alert("El estudiante ya esta inscrito en este curso.");
        return;
    }

    const activasDelCurso = inscripcionService.obtenerActivasPorCurso(cursoId).length;
    if (activasDelCurso >= curso.cupoMaximo) {
        alert("No se puede inscribir: se alcanzo el cupo maximo del curso.");
        return;
    }

    inscripcionService.agregar({
        id: contadorInscripcionId++,
        estudianteId,
        cursoId,
        fecha: new Date().toISOString().slice(0, 10),
        estado: "activa"
    });

    actualizarTodo();
});

buscarEstudianteInput.addEventListener("input", actualizarTodo);
filtroEstadoEstudiante.addEventListener("change", actualizarTodo);
buscarCursoInput.addEventListener("input", actualizarTodo);
filtroEstadoCurso.addEventListener("change", actualizarTodo);

selectRelacionEstudiante.addEventListener("change", renderRelaciones);
selectRelacionCurso.addEventListener("change", renderRelaciones);

function eliminarEstudiante(id: number): void {
    if (!confirm("Seguro que deseas eliminar este estudiante?")) {
        return;
    }

    estudianteService.eliminar(id);
    inscripcionService.reemplazarTodos(inscripcionService.obtenerTodos().filter(i => i.estudianteId !== id));
    actualizarTodo();
}

function eliminarCurso(id: number): void {
    if (!confirm("Seguro que deseas eliminar este curso?")) {
        return;
    }

    cursoService.eliminar(id);
    inscripcionService.reemplazarTodos(inscripcionService.obtenerTodos().filter(i => i.cursoId !== id));
    actualizarTodo();
}

function editarEstudiante(id: number): void {
    const estudiante = estudianteService.obtenerPorId(id);
    if (!estudiante) {
        return;
    }

    estudianteEditandoId = id;
    nombreInput.value = estudiante.nombre;
    emailInput.value = estudiante.correo;
    edadInput.value = estudiante.edad.toString();
    carreraInput.value = estudiante.carrera;
    btnAgregar.textContent = "Guardar cambios";
}

function editarCurso(id: number): void {
    const curso = cursoService.obtenerPorId(id);
    if (!curso) {
        return;
    }

    cursoEditandoId = id;
    nombreCursoInput.value = curso.nombre;
    siglaInput.value = curso.sigla;
    docenteInput.value = curso.docente;
    cupoInput.value = curso.cupoMaximo.toString();
    btnAgregarCurso.textContent = "Guardar cambios";
}

function actualizarSelects(): void {
    const estudiantes = estudianteService.obtenerTodos();
    const cursos = cursoService.obtenerTodos();

    selectEstudiante.innerHTML = "";
    selectRelacionEstudiante.innerHTML = "";

    estudiantes.forEach(e => {
        const opcionInscripcion = document.createElement("option");
        opcionInscripcion.value = e.id.toString();
        opcionInscripcion.textContent = `${e.nombre} (${e.estado})`;
        selectEstudiante.appendChild(opcionInscripcion);

        const opcionRelacion = document.createElement("option");
        opcionRelacion.value = e.id.toString();
        opcionRelacion.textContent = e.nombre;
        selectRelacionEstudiante.appendChild(opcionRelacion);
    });

    selectCurso.innerHTML = "";
    selectRelacionCurso.innerHTML = "";

    cursos.forEach(c => {
        const opcionInscripcion = document.createElement("option");
        opcionInscripcion.value = c.id.toString();
        opcionInscripcion.textContent = `${c.nombre} (${c.estado})`;
        selectCurso.appendChild(opcionInscripcion);

        const opcionRelacion = document.createElement("option");
        opcionRelacion.value = c.id.toString();
        opcionRelacion.textContent = c.nombre;
        selectRelacionCurso.appendChild(opcionRelacion);
    });
}

function renderRelaciones(): void {
    const estudianteId = Number(selectRelacionEstudiante.value);
    const cursoId = Number(selectRelacionCurso.value);

    const cursosDelEstudiante = inscripcionService
        .obtenerPorEstudiante(estudianteId)
        .map(i => ({ ...i, curso: cursoService.obtenerPorId(i.cursoId) }))
        .filter(item => item.curso);

    cursosDeEstudiante.innerHTML = "";
    cursosDelEstudiante.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.curso?.nombre} - ${item.estado}`;
        cursosDeEstudiante.appendChild(li);
    });

    if (cursosDelEstudiante.length === 0) {
        cursosDeEstudiante.innerHTML = "<li>Sin cursos asignados.</li>";
    }

    const estudiantesDelCurso = inscripcionService
        .obtenerPorCurso(cursoId)
        .map(i => ({ ...i, estudiante: estudianteService.obtenerPorId(i.estudianteId) }))
        .filter(item => item.estudiante);

    estudiantesDeCurso.innerHTML = "";
    estudiantesDelCurso.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.estudiante?.nombre} - ${item.estado}`;
        estudiantesDeCurso.appendChild(li);
    });

    if (estudiantesDelCurso.length === 0) {
        estudiantesDeCurso.innerHTML = "<li>Sin estudiantes inscritos.</li>";
    }
}

function actualizarStats(): void {
    const estudiantes = estudianteService.obtenerTodos();
    const cursos = cursoService.obtenerTodos();
    const inscripciones = inscripcionService.obtenerTodos();
    const inscripcionesActivas = inscripciones.filter(i => i.estado === "activa");

    totalEstudiantes.textContent = estudiantes.length.toString();
    totalCursos.textContent = cursos.length.toString();
    totalInscripciones.textContent = inscripciones.length.toString();

    estudiantesActivos.textContent = estudiantes.filter(e => e.estado === "activo").length.toString();
    cursosCerrados.textContent = cursos.filter(c => c.estado === "cerrado").length.toString();

    let maxCursoId: number | null = null;
    let maxCantidad = 0;

    cursos.forEach(curso => {
        const cantidad = inscripcionesActivas.filter(i => i.cursoId === curso.id).length;
        if (cantidad > maxCantidad) {
            maxCantidad = cantidad;
            maxCursoId = curso.id;
        }
    });

    if (maxCursoId === null || maxCantidad === 0) {
        cursoMasInscritos.textContent = "Sin datos";
    } else {
        const curso = cursoService.obtenerPorId(maxCursoId);
        cursoMasInscritos.textContent = `${curso?.nombre ?? "N/A"} (${maxCantidad})`;
    }
}

function actualizarTodo(): void {
    const estudiantes = estudianteService.obtenerTodos();
    const cursos = cursoService.obtenerTodos();
    const inscripciones = inscripcionService.obtenerTodos();

    const terminoEstudiante = normalizarTexto(buscarEstudianteInput.value);
    const estadoEstudiante = filtroEstadoEstudiante.value;

    const estudiantesFiltrados = estudiantes.filter(e => {
        const coincideNombre = normalizarTexto(e.nombre).includes(terminoEstudiante);
        const coincideEstado = estadoEstudiante === "todos" || e.estado === estadoEstudiante;
        return coincideNombre && coincideEstado;
    });

    const terminoCurso = normalizarTexto(buscarCursoInput.value);
    const estadoCurso = filtroEstadoCurso.value;

    const cursosFiltrados = cursos.filter(c => {
        const coincideNombreOSigla =
            normalizarTexto(c.nombre).includes(terminoCurso) ||
            normalizarTexto(c.sigla).includes(terminoCurso);
        const coincideEstado = estadoCurso === "todos" || c.estado === estadoCurso;
        return coincideNombreOSigla && coincideEstado;
    });

    renderEstudiantes(estudiantesFiltrados, {
        eliminar: eliminarEstudiante,
        editar: editarEstudiante,
        cambiarEstado: (id: number) => {
            estudianteService.cambiarEstado(id);
            actualizarTodo();
        }
    });

    renderCursos(cursosFiltrados, {
        eliminar: eliminarCurso,
        editar: editarCurso,
        cambiarEstado: (id: number) => {
            cursoService.cambiarEstado(id);
            actualizarTodo();
        }
    });

    renderInscripciones(
        inscripciones,
        estudiantes,
        cursos,
        (id: number) => {
            inscripcionService.cambiarEstado(id);
            actualizarTodo();
        },
        (id: number) => {
            inscripcionService.eliminar(id);
            actualizarTodo();
        }
    );

    actualizarSelects();
    renderRelaciones();
    actualizarStats();
}

async function cargarDatosIniciales(): Promise<void> {
    const yaTieneDatos =
        estudianteService.obtenerTodos().length > 0 ||
        cursoService.obtenerTodos().length > 0 ||
        inscripcionService.obtenerTodos().length > 0;

    if (yaTieneDatos) {
        return;
    }

    try {
        const respuesta = await fetch("./data/datos-iniciales.json");
        if (!respuesta.ok) {
            return;
        }

        const datos = (await respuesta.json()) as DatosIniciales;
        estudianteService.reemplazarTodos(datos.estudiantes ?? []);
        cursoService.reemplazarTodos(datos.cursos ?? []);
        inscripcionService.reemplazarTodos(datos.inscripciones ?? []);
    } catch {
        // No bloquea la app si no existe el archivo de datos iniciales.
    }
}

async function iniciarApp(): Promise<void> {
    await cargarDatosIniciales();
    recalcularContadores();
    actualizarTodo();
}

void iniciarApp();
