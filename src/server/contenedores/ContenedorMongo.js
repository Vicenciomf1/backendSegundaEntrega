import mongoDB from "../db/mongodb/mongo.js";
import {model} from "mongoose";

const formatoCliente = (document, retorno) => {
  retorno.id = retorno._id.toString();
  delete retorno._id;
};

export default class ContenedorMongo {
  constructor(nombreColeccion, esquema){
    esquema.set("toJSON", { transform: formatoCliente, versionKey: false });
    this.db = mongoDB;
    this.nombre = nombreColeccion;
    this.coleccion = model(nombreColeccion, esquema);  // Modelo (MVC) entregado por mongoose
  }

  async save(objeto){
    try{
      const {_id: objectId} = await this.coleccion(objeto).save();
      return objectId.toHexString();  // Devuelve el ID, ¿cuál es la diferencia con toString()?
    } catch (e) {
      console.log("Error al guardar el objeto: ", e);
    }
  }

  async saveMany(objetos){
    try{
      console.log("Guardando muchos objetos...");
      await this.coleccion.insertMany(objetos);
      console.log("Objetos guardados.");
    } catch (e) {
      console.log("Error al guardar los objetos: ", e);
    }
  }

  async getById(Id){
    try{
      const objeto = await this.coleccion.findOne( { _id: Id } );
      return objeto.toJSON();
    } catch (e) {
      console.log("Error al obtener el objeto: ", e);
    }
  }

  async getAll(){
    try{
      const objetos = await this.coleccion.find({});
      return objetos.map(objeto => objeto.toJSON());
    } catch (e) {
      console.log(`Error al obtener todos los objetos de la colección ${this.nombre}: "${e}"`);
    }
  }

  async updateById(objetoNuevo){
    try{
      return await this.coleccion.replaceOne({ id: objetoNuevo.id }, objetoNuevo);
    } catch (e) {
      console.log("Error al actualizar el objeto: ", e);
    }
  }

  async updateFieldById(Id, field, value){
    try{
      return await this.coleccion.updateOne({ id: Id }, { $set: { [field]: value } });
    } catch (e) {
      console.log("Error al actualizar el campo del objeto: ", e);
    }
  }

  async deleteById(Id){
    try{
      await this.coleccion.deleteOne({ id: Id });
    } catch (e) {
      console.log("Error al eliminar el objeto: ", e);
    }
  }

  async deleteManyByField(field, value){
    try{
      const res = await this.coleccion.deleteMany({ [field]: value });
      return res.deletedCount;  // Retorna cantidad de eliminados, aunque generalmente solo necesitarás el E/S
    }  catch (e) {
      console.log("Error al eliminar los objetos por campo: ", e);
    }
  }

  async deleteAll(){
    try{
      console.log("Eliminando muchos arhcivos...");
      await this.coleccion.deleteMany({});
    } catch (e) {
      console.log("Error al eliminar los objetos: ", e);
    }
  }

}