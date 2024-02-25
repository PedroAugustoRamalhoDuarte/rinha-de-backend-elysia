import {Elysia} from "elysia";
import transacoesController from "./controllers/transacoesController";

export const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(transacoesController)
  .listen(3000);
