import {Elysia} from "elysia";
import {PrismaClient} from '@prisma/client'

const db = new PrismaClient()

const transacoesController = (app: Elysia) => {
  app.post("/clientes/:id/transacoes", async ({body, params}) => {
    const clientId = parseInt(params.id)
    const client = await db.$transaction(async (tx) => {
        try {
          const client = await tx.clientes.findUnique({
            where: {id: clientId},
          })

          const transaction = await tx.transacoes.create({
            data: {
              valor: body.valor,
              tipo: body.tipo,
              descricao: body.descricao,
              clienteId: clientId
            }
          })

          const updatedClient = await tx.clientes.update({
            where: {id: clientId},
            data: {
              saldo: body.tipo === 'd' ? client.saldo - body.valor : client.saldo + body.valor
            }
          })

          return updatedClient;
        } catch (error) {
          console.error(error)

          return {error: error.message}
        }
      }
    );

    return {
      limite: client.limite,
      saldo: client.saldo,
    }
  });

  return Promise.resolve(app);
}

export default transacoesController;