import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function insert(name, email) {
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email
    }
  });

  console.log(newUser);
}

async function read() {
  const users = await prisma.user.findMany();

  // console.log('All users:', users);
  
  return users;
}

async function update(id, requisit) {
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { email: requisit }
  });

  console.log('User updated:', updatedUser);
}

async function remove(id) {
  const deletedUser = await prisma.user.delete({
    where: { id: id },
  });
  console.log('User deleted:', deletedUser);
}

export { insert, read, update, remove }; 