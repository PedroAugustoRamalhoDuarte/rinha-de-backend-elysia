import {app} from "../src";
import {describe, expect, it} from "bun:test";
import {PrismaClient} from "@prisma/client";

const baseUrl = `${app.server?.hostname}:${app.server?.port}/clientes/`;

const db = new PrismaClient()

describe('POST /clientes/:id/transacoes', () => {
  it('should create a transaction', async () => {
    const client = await db.clientes.create({
      data: {
        nome: 'Teste',
        limite: 1000,
        saldo: 1000
      }
    })
    const req = new Request(baseUrl + client.id + '/transacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valor: 100,
        tipo: 'd',
        descricao: 'Compra de pão'
      })
    })
    const res = await app.fetch(req);
    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual({
      limite: 1000,
      saldo: 900
    });
  });
});