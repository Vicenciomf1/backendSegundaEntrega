import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { STRING_CONEXION_MONGO } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 5000
};

const mongoDB = mongoose.connect(STRING_CONEXION_MONGO, options)
  .then(() => console.log("Conectado a la base de datos"))
  .catch(error => console.log("Ha ocurrido un error de conexión al inicializar la base de datos: ", error));

export default mongoDB;