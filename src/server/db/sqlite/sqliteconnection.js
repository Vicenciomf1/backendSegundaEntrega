import knex from "knex";
import {__dirname} from "../../utils/dirname.js";
import path from "path";

const dbDir = path.resolve(__dirname, "..", "db", "sqlite", "ecommerce.sqlite");
const options = {
  client: 'sqlite3',
  connection: {
    filename: dbDir
  },
  useNullAsDefault: true
};

const sqlite = knex(options);

export default sqlite;
