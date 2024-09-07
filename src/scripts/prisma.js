import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function insert(name, email) {
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email
    }
  });

  return newUser;
}

async function read() {
  const users = await prisma.user.findMany();
  
  return users;
}

async function update(id, requisit) {
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { email: requisit }
  });

  return `Usuário atualizado: ${updatedUser}`;
}

async function remove(id) {
  const deletedUser = await prisma.user.delete({
    where: { id: id }
  });


  return `Usuário deletado: ${deletedUser}`;
}

export { insert, read, update, remove }; 