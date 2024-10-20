class PacienteModelo {
  constructor() {
    this.pacientes = [];
  }

  registrarPaciente(paciente) {
    if (
      this.validarPaciente(paciente) &&
      !this.existePaciente(paciente.nombre)
    ) {
      this.pacientes.push(paciente);
      return true;
    }
    return false;
  }

  existePaciente(nombre) {
    return this.pacientes.some((paciente) => paciente.nombre === nombre);
  }

  validarPaciente(paciente) {
    const { nombre, cedula_paciente, examen, fecha, nombre_paciente } =
      paciente;
    if (!nombre || !cedula_paciente || !fecha || !examen || !telefonos || !nombre_paciente) {
      return false;
    }

    return true;
  }

  obtenerPacientes() {
    return this.pacientes;
  }
}
//-----------------------------------vista de aqui pa bajo------------------------------------------------------------------------------------------

class PacienteVista {
  constructor() {
    this.formulario = document.getElementById("formularioRegistro");
    this.nombre_solicitante_Input = document.getElementById("nombre_solicitante");
    this.nombre_paciente_Input = document.getElementById("nombre_paciente");
    this.cedula_paceinte_Input = document.getElementById("cedula_paciente");
    this.examen_Input = document.getElementById("examen");
    this.telefonos_Input = document.getElementById("telefonos")
    this.fecha_solicitada_Input = document.getElementById("fecha_solicitada");
    this.mensaje = document.getElementById("mensaje");
    this.listaPacientes = document.getElementById("listaPacientes");
  }

  obtenerDatosFormulario() {
    return {
      nombre: this.nombre_solicitante_Input.value.trim(),
      nombre_paciente: this.nombre_paciente_Input.value.trim(),
      cedula_paciente: this.cedula_paceinte_Input.value.trim(),
      examen: this.examen_Input.value.trim(),
      telefonos: this.telefonos_Input.value.trim(),
      fecha: this.fecha_solicitada_Input.value.trim(),
    };
  }

  mostrarMensaje(mensaje, esExito = true) {
    this.mensaje.textContent = mensaje;
    this.mensaje.style.color = esExito ? "green" : "red";
  }

  limpiarFormulario() {
    this.nombre_solicitante_Input.value = "";
    this.nombre_paciente_Input.value = "";
    this.cedula_paceinte_Input.value = "";
    this.examen_Input.value = "";
    this.telefonos_Input = "";
    this.fecha_solicitada_Input.value = "";
  }

  onFormSubmit(callback) {
    this.formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      callback();
    });
  }

  // mostrar la lista de pacientes
  mostrarPacientes(pacientes) {
    this.listaPacientes.innerHTML = ""; // Limpiar la lista actual
    const tabla = document.createElement("table");
    tabla.innerHTML = `
            <thead>
                <tr>
                <th>Nombre del quien solicita</th>
                        <th>Nombre del paciente:</th>
                        <th>Cedula del paciente:</th>
                        <th>Examen</th>
                        <th>Telefonos:</th>
                        <th>Fecha solicitada:</th>
                        <th>Acciones</th> 
                        
                </tr>
            </thead>
            <tbody> 
            </tbody>
            `;

    const tbody = tabla.querySelector("tbody");

    pacientes.forEach((pcte) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
               

                <td>${pcte.nombre}</td>
                <td>${pcte.nombre_paciente}</td>
                <td>${pcte.cedula_paciente}</td>
                <td>${pcte.examen}</td>
                <td>${pcte.telefonos}</td>
                <td>${pcte.fecha}</td>
                <td><button class="eliminar-btn">Eliminar</button></td>  <!-- Botón de eliminar -->
                    `;
      tbody.appendChild(fila);
    });

    this.listaPacientes.appendChild(tabla);

    const botonesEliminar = tabla.querySelectorAll(".eliminar-btn");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            const fila = event.target.closest("tr");
            fila.remove();
        });
    });

  }
}

//---------------------------------------controlador de aqui pa bajo------------------------------------------------------------------------------------------------------------

class PacienteControlador {
  constructor(modelo, vista) {
    this.modelo = modelo;
    this.vista = vista;

    this.vista.onFormSubmit(() => this.registrarPaciente());
    this.actualizarListaPacientes(); // Mostrar pacientes cuando la página se carga
  }

  registrarPaciente() {
    const datosPaciente = this.vista.obtenerDatosFormulario();
    const totalRegistrado = this.modelo.registrarPaciente(datosPaciente);

    if (totalRegistrado) {
      this.vista.mostrarMensaje("Usuario registrado exitosamente.");
      this.vista.limpiarFormulario();
      this.actualizarListaPacientes(); // Actualizar la lista después de registrar
    } else if (this.modelo.existePaciente(datosPaciente.nombre)) {
      this.vista.mostrarMensaje(
        "El nombre del pcte ya está registrado.",
        false
      );
    }
    // else {
    //    this.vista.mostrarMensaje('Error en el registro. Todos los campos son obligatorios.', false);
    // }
  }

  actualizarListaPacientes() {
    const pacientes = this.modelo.obtenerPacientes();
    this.vista.mostrarPacientes(pacientes);
  }
}

// Inicialización
const modelo = new PacienteModelo();
const vista = new PacienteVista();
const controlador = new PacienteControlador(modelo, vista);
