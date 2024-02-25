import {Elysia} from "elysia";
import {PrismaClient} from '@prisma/client'

const db = new PrismaClient()

export const extratoController = (app: Elysia) => {
  app.get("/clientes/:id/extrato", async ({query}) => {
    const client = db.clientes.findUnique({
      where: {id: parseInt(query.id)},
    })

    const lastTransactions = db.transacoes.findMany({
      where: {clienteId: query.id},
      orderBy: {createdAt: 'desc'},
      take: 10,
    })

    return {
      saldo: {
        total: client.saldo,
        data_extrato: new Date(),
        limte: client.limite,
      },
      lastTransactions: lastTransactions.map((t) => ({
        valor: t.valor,
        data: t.data,
        descricao: t.descricao,
        realizada_em: t.createdAt
      })),
    }
  });
}