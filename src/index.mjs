import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

function serializeBigInt(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

app.get('/avatars', async (req, res) => {
  const usuarios = await prisma.avatars.findMany();
  res.json(serializeBigInt(usuarios));
});

app.post('/usuarios', async (req, res) => {
  const { nombre, email } = req.body;

  const usuario = await prisma.usuario.create({
    data: { nombre, email },
  });

  res.json(usuario);
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});