import database from "../db/firestore/firestore.js";

export default class ContenedorFirestore {
  constructor(nombreColeccion) {
    this.coleccionRef = database.collection(nombreColeccion);
  }

  async getAll() {
    try {
      const capturaConsulta = await this.coleccionRef.get();
      const documentos = capturaConsulta.docs;

      return documentos.map( ({data, id}) => ( { id, ...data() } ));
    } catch (error) {
      console.log("Nos hemos encontrado con el siguiente error:", error);
    }
  }

  async getById(id) {
    try {
      const documento = await this.coleccionRef.doc(id).get();  // Necesito TypeScript para saber qué pide el doc()
      if (!documento.exists) throw new Error("No existe el documento");

      return { id, ...documento.data() }
    } catch (error) {
      console.log("Nos hemos encontrado con el siguiente error:", error);
    }
  }

  async save(data) {
    try {
      const documentoRef = await this.coleccionRef.add(data);
      return documentoRef.id;
    } catch (error) {
      console.log("Nos hemos encontrado con el siguiente error:", error);
    }
  }

  async updateById(id, data) {
    try {
      await this.coleccionRef.doc(id).update(data);
    } catch (error) {
      console.log("Nos hemos encontrado con el siguiente error:", error);
    }
  }

  async deleteById(id) {
    try {
      await this.coleccionRef.doc(id).delete();
    } catch (error) {
      console.log("Nos hemos encontrado con el siguiente error:", error);
    }
  }

  async deleteAll() {
    try {
      const capturaConsulta = await this.coleccionRef.get();
      const documentos = capturaConsulta.docs;

      documentos.forEach( documento => documento.ref.delete() );  // ¿No habrá problemas por el asincronismo?
      // Google tiene su propia manera (https://firebase.google.com/docs/firestore/manage-data/delete-data#collections), pero sigue recomendarlo hacerlo desde la consola de Firebase o con una Cloud Function (https://firebase.google.com/docs/firestore/solutions/delete-collections)
    } catch (error) {
      console.log("Nos hemos encontrado con el siguiente error:", error);
    }
  }
}