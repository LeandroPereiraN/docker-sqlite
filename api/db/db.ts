import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const createDBConnection = async () => {
  const db = await open({
    filename: process.env.DB_PATH ?? "../sqlite/database.db",
    driver: sqlite3.Database,
  });

  return db;
};
