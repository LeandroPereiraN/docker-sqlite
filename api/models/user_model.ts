import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export const User = Type.Object({
  IDUSUARIO: Type.Optional(Type.Integer()),

  ACTIVO: Type.String({ minLength: 1, maxLength: 1 }),
  CLAVE: Type.String({ minLength: 1 }),
  CONFIRMADO: Type.String({ minLength: 1, maxLength: 1 }),

  DOCUMENTO: Type.Integer(),
  FECHA_NACIMIENTO: Type.String({ format: "date" }),

  MAIL_INSTITUCIONAL: Type.Optional(Type.String({ format: "email" })),
  MAIL_PERSONAL: Type.Optional(Type.String({ format: "email" })),

  PRIMER_APELLIDO: Type.String(),
  PRIMER_NOMBRE: Type.String(),

  SEGUNDO_APELLIDO: Type.Optional(Type.String()),
  SEGUNDO_NOMBRE: Type.Optional(Type.String()),

  TELEFONO: Type.Optional(Type.String()),

  TIPO_USUARIO: Type.String(),
  USUARIO: Type.String(),

  IDDEPARTAMENTO: Type.Integer(),
  IDGENERO: Type.Integer(),
  IDITR: Type.Integer(),
  IDLOCALIDAD: Type.Integer(),
});

export type UserType = Static<typeof User>;
