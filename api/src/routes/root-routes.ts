import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { User } from "../models/user_model.js";
import { UserService } from "../services/user_services.js";

const rootRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["root"],
        summary: "Verifica el estado de la aplicación",
        description: "Devuelve ok si está funcionando la aplicación",
        response: {
          200: {
            type: "object",
            properties: {
              root: { type: "boolean" },
            },
          },
        },
      },
    },
    async (req, res) => {
      return { root: true };
    }
  );
  fastify.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        summary: "Obtener los usuarios",
        description: "Devuelve una lista de usuarios",
        response: {
          200: Type.Array(User),
        },
      },
    },
    async (req, res) => {
      return await UserService.getAllUsers();
    }
  );
  fastify.get(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        summary: "Obtener el usuario por ID",
        description: "Devuelve el usuario correspondiente al ID",
        response: {
          200: User,
          400: Type.Object({
            error: Type.String(),
          }),
          404: Type.Object({
            error: Type.String(),
          }),
        },
        params: Type.Object({
          id: Type.Integer(),
        }),
      },
    },
    async (req, res) => {
      const id = req.params.id;
      if (!id) {
        res.status(400);
        return { error: "ID de usuario inválido" };
      }
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(404);
        return { error: "Usuario no encontrado" };
      }
      return user;
    }
  );
  fastify.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        summary: "Crear el usuario",
        description: "Crea el usuario",
        body: Type.Omit(User, ["IDUSUARIO"]),
        response: {
          200: User,
          400: Type.Object({
            error: Type.String(),
          }),
          404: Type.Object({
            error: Type.String(),
          }),
        },
      },
    },
    async (req, res) => {
      const body = req.body as typeof User.Type;

      const user = await UserService.createUser(body);
      if (!user) {
        res.status(404);
        return { error: "Usuario no encontrado" };
      }
      return user;
    }
  );
  fastify.delete(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        summary: "Eliminar el usuario por ID",
        description: "Elimina el usuario correspondiente al ID",
        response: {
          200: Type.Object({
            message: Type.String(),
          }),
          400: Type.Object({
            error: Type.String(),
          }),
          404: Type.Object({
            error: Type.String(),
          }),
        },
        params: Type.Object({
          id: Type.Integer(),
        }),
      },
    },
    async (req, res) => {
      const id = req.params.id;
      if (!id) {
        res.status(400);
        return { error: "ID de usuario inválido" };
      }
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(404);
        return { error: "Usuario no encontrado" };
      }
      await UserService.deleteUser(id);
      return { message: "Usuario eliminado satisfactoriamente" };
    }
  );
  fastify.put(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        summary: "Actualizar el usuario por ID",
        description: "Actualiza el usuario correspondiente al ID",
        body: Type.Partial(User),
        response: {
          200: User,
          400: Type.Object({
            error: Type.String(),
          }),
          404: Type.Object({
            error: Type.String(),
          }),
        },
        params: Type.Object({
          id: Type.Integer(),
        }),
      },
    },
    async (req, res) => {
      const id = req.params.id;
      const body = req.body as Partial<typeof User.Type>;
      if (!id) {
        res.status(400);
        return { error: "ID de usuario inválido" };
      }
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(404);
        return { error: "Usuario no encontrado" };
      }
      const userUpdated = await UserService.updateUser(id, body);
      return userUpdated;
    }
  );
};

export default rootRoutes;
