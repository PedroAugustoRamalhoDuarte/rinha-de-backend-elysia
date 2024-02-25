import {Elysia} from "elysia";
import transacoesController from "./controllers/transacoesController";

export const app = new Elysia()
  .onError(({code, error, set}) => {
    console.error(error)
  })
  .use(transacoesController)
  .listen(3000);
