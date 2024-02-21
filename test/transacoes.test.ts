import {app} from "../src";
import {describe, expect, it} from "bun:test";

const baseUrl = `${app.server?.hostname}:${app.server?.port}/clientes/`;


describe('POST /clientes/:id/transacoes', () => {
  it('should create a transaction', async () => {
    const req = new Request(baseUrl + '1/transacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valor: 100,
        tipo: 'debito',
        descricao: 'Compra de pão'
      })
    })
    const res = await app.fetch(req);
    console.log(res);
    expect(res.status).toEqual(200);
  });
});