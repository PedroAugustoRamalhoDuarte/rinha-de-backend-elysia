import {Elysia} from "elysia";
import {PrismaClient} from '@prisma/client'

const db = new PrismaClient()

export const transacoesController = (app: Elysia) => {
  return app.post("/clientes/:id/transacoes", async ({query, params}) => {
      const clientId = parseInt(params.id)
      const client = await db.$transaction(async (tx) => {
        const client = await tx.clientes.findUnique({
          where: {id: clientId},
        })

        console.log("client", client)

        tx.transacoes.create({
          data: {
            valor: query.valor,
            tipo: query.tipo,
            descricao: query.descricao,
            clienteId: clientId
          }
        })

        const updatedClient = tx.clientes.update({
          where: {id: clientId},
          data: {
            saldo: query.tipo === 'debito' ? client.saldo - query.valor : client.saldo + query.valor
          }
        })
      })

      return {
        limite: client.limite,
        saldo: client.saldo,
      }
    }
  );
}