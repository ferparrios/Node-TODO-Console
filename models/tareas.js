const Tarea = require("./tarea");

class Tareas {
  _listado = {};


  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
      // console.log(key)
    })

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = ''){
    if (this._listado[id]){
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })

  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.blue;
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn) ? 'Completada'.white : 'Pendiente'.red
      console.log(`${idx} ${desc} :: ${estado}`);
    })
  }

  listarPendientesCompletadas(completadas = true){
    console.log();
    let contador = 0;
    this.listadoArr.forEach(tarea => {
      // const idx = `${i + 1}`.blue;
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn) ? 'Completada'.white : 'Pendiente'.red
      if (completadas) {
        if (completadoEn) {
          // console.log(`${idx} ${desc} :: ${estado}`);
          contador += 1;
          console.log(`${(contador + '.').blue} ${desc} :: ${completadoEn.blue}`);
        }
      } else {
        if (!completadoEn) {
          // console.log(`${idx} ${desc} :: ${estado}`);
          contador += 1;
          console.log(`${(contador + '.').blue} ${desc} :: ${estado}`);
        }
      }
  
    })
  }

  toggleCompletadas(ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(tarea => {
      if(ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}




module.exports = Tareas