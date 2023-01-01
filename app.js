const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
// import inquirerMenu from './helpers/inquirer.js'
require('colors');
// const { mostrarMenu, pausa } = require('./helpers/messages');

console.clear();

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    // establecer tareas
    tareas.cargarTareasFromArray(tareasDB);
  }
  // await pausa();

  do {
    opt = await inquirerMenu();
    // console.log({ opt });
    switch (opt) {
      case '1':
        // crear opcion
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        // console.log(desc);
        break;

      case '2':
        tareas.listadoCompleto();
        // console.log(tareas.listadoArr);
        break;

      case '3':
        tareas.listarPendientesCompletadas(true);
        // console.log(tareas.listadoArr);
        break;

      case '4':
        tareas.listarPendientesCompletadas(false);
        // console.log(tareas.listadoArr);
        break;

      case '5':
        const ids = await mostrarListadoChecklist(tareas.listadoArr)
        // console.log(ids)
        tareas.toggleCompletadas(ids)

      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          const ok = await confirmar('Esta seguro?')
          if (ok) {
            tareas.borrarTarea(id)
            console.log('Tarea Borrada')
          }
        }

        // Confirmacion
        // console.log({ok});
        break

      default:
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();

  } while (opt !== '0');

}

main();