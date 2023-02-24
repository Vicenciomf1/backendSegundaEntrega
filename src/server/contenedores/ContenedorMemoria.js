export default class ContenedorMemoria {
  constructor(objetos=[], ultimoId=0){
    this.objetos = objetos;
    this.ultimoId = ultimoId;  // Más rápido que objetos.length
  }

  save(objeto){
    try{
      if (objeto.id) throw new Error("El objeto ya tiene un id, este debe ser asignado por el contenedor");  // https://stackoverflow.com/questions/47015693/how-to-fix-throw-of-exception-caught-locally

      objeto.id = this.ultimoId++; // this.ultimoId += 1;
      this.objetos.push(objeto);

      return objeto.id;
    } catch (error) {
      console.log("No se pudo guardar el objeto, tu error es el siguiente: " + error);
    }
  }

  getAll(){
    return this.objetos;
  }

  getById(id){
    return this.objetos.find(objeto => objeto.id === id);
  }

  updateById(id, nuevoObjeto){
    const index = this.objetos.findIndex(objeto => objeto.id === id);
    if (index === -1) return null;
    this.objetos[index] = { id, ...nuevoObjeto };
    return nuevoObjeto;
  }

  deleteById(id){
    const index = this.objetos.findIndex(objeto => objeto.id === id);
    if (index === -1) return null;
    this.objetos.splice(index, 1);
  }

  deleteAll(){
    this.objetos = [];
  }
}