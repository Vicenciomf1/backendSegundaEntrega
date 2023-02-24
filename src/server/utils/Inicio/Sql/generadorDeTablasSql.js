const crearGeneradorDeTablas = function(db, nombreTabla, tabla, contenidoRaw){
  return async () => {
    try {
      const exists = await db.schema.hasTable(nombreTabla);
      if (exists) await db.schema.dropTable(nombreTabla);

      // Crear la tabla
      await db.schema.createTable(nombreTabla, tabla);

      // Insertar productos
      await db.from(nombreTabla).insert(contenidoRaw);
    } catch (error) {
      console.log(`Ha ocurrido un error ${error}`);
    }
  }
}

export default crearGeneradorDeTablas;