const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.clientes.upsert({
      where: { id: 1 },
      create: { id: 1, nome: 'o barato sai caro', limite: 1000 * 100 },
      update: { nome: 'o barato sai caro', limite: 1000 * 100 },
    });

    await prisma.clientes.upsert({
      where: { id: 2 },
      create: { id: 2, nome: 'zan corp ltda', limite: 800 * 100 },
      update: { nome: 'zan corp ltda', limite: 800 * 100 },
    });

    await prisma.clientes.upsert({
      where: { id: 3 },
      create: { id: 3, nome: 'les cruders', limite: 10000 * 100 },
      update: { nome: 'les cruders', limite: 10000 * 100 },
    });

    await prisma.clientes.upsert({
      where: { id: 4 },
      create: { id: 4, nome: 'padaria joia de cocaia', limite: 100000 * 100 },
      update: { nome: 'padaria joia de cocaia', limite: 100000 * 100 },
    });

    await prisma.clientes.upsert({
      where: { id: 5 },
      create: { id: 5, nome: 'kid mais', limite: 5000 * 100 },
      update: { nome: 'kid mais', limite: 5000 * 100 },
    });

    console.log('Seeds criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar seeds:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch(console.error);
