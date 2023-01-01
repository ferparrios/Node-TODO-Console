const inquirer = require('inquirer');
require('colors');

const preguntas = [{
  type: 'list',
  name: 'option',
  message: 'Que desea hacer?',
  choices: [
    { value: '1', name: `${'1.'.red} Crear Tarea` },
    { value: '2', name: '2. Listar Tareas' },
    { value: '3', name: '1. Listar Tareas Completadas' },
    { value: '4', name: '4. Listar Tareas Pendientes' },
    { value: '5', name: '5. Completar Tarea(s)' },
    { value: '6', name: '6. Borrar Tarea' },
    { value: '0', name: '0. Salir' },
  ]
}]

const inquirerMenu = async () => {
  console.log('======================'.red)
  console.log('Seleccione una opción'.white)
  console.log('======================'.red)

  const { option } = await inquirer.prompt(preguntas)

  return option;
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.yellow} para continuar`
    }
  ]
  console.log('\n');
  await inquirer.prompt(question)
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true;
      }
    }
  ]
  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.blue
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  })
  choices.unshift({
    value: '0',
    name: '0.'.red + ' Cancelar'
  })
  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]
  const { id } = await inquirer.prompt(preguntas)
  return id;
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]
  const { ok } = await inquirer.prompt(question)
  return ok
}

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.blue
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  })
  
  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(pregunta)
  return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
}