import { createDBConnection } from "../db/db.js";
import type { UserType } from "../models/user_model.js";

export class UserService {
  static async getAllUsers() {
    const db = await createDBConnection();
    const users = await db.all("SELECT * FROM USUARIOS");
    return users;
  }

  static async getUserById(id: number) {
    const db = await createDBConnection();
    const user = await db.get("SELECT * FROM USUARIOS WHERE IDUSUARIO = ?", id);
    return user;
  }

  static async createUser(userData: UserType) {
    const db = await createDBConnection();
    const result = await db.run(
      `INSERT INTO USUARIOS
        (ACTIVO, CLAVE, CONFIRMADO, DOCUMENTO, FECHA_NACIMIENTO, MAIL_INSTITUCIONAL, MAIL_PERSONAL, PRIMER_APELLIDO, PRIMER_NOMBRE, SEGUNDO_APELLIDO, SEGUNDO_NOMBRE, TELEFONO, TIPO_USUARIO, USUARIO, IDDEPARTAMENTO, IDGENERO, IDITR, IDLOCALIDAD)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      userData.ACTIVO,
      userData.CLAVE,
      userData.CONFIRMADO,
      userData.DOCUMENTO,
      userData.FECHA_NACIMIENTO,
      userData.MAIL_INSTITUCIONAL,
      userData.MAIL_PERSONAL,
      userData.PRIMER_APELLIDO,
      userData.PRIMER_NOMBRE,
      userData.SEGUNDO_APELLIDO,
      userData.SEGUNDO_NOMBRE,
      userData.TELEFONO,
      userData.TIPO_USUARIO,
      userData.USUARIO,
      userData.IDDEPARTAMENTO,
      userData.IDGENERO,
      userData.IDITR,
      userData.IDLOCALIDAD
    );
    return { id: result.lastID, ...userData };
  }

  static async deleteUser(id: number) {
    const db = await createDBConnection();
    await db.run("DELETE FROM USUARIOS WHERE IDUSUARIO = ?", id);
    return { message: "Usuario eliminado satisfactoriamente" };
  }

  static async updateUser(id: number, userData: Partial<UserType>) {
    const db = await createDBConnection();
    const fields = Object.keys(userData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(userData);
    await db.run(
      `UPDATE USUARIOS SET ${fields} WHERE IDUSUARIO = ?`,
      ...values,
      id
    );
    return { id, ...userData };
  }
}
