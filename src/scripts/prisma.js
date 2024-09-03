import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function insert() {
  const newUser = await prisma.user.create({
    data: {
      name: user,
      email: email
    }
  });

  console.log(newUser);
}

async function read() {
  const users = await prisma.user.findMany();

  root.innerHTML = users;
  console.log('All users:', users);
}

async function update() {
  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { email: 'John Updated' }
  });

  console.log('User updated:', updatedUser);
}

async function remove() {
  const deletedUser = await prisma.user.delete({
    where: { id: newUser.id },
  });
  console.log('User deleted:', deletedUser);
}

export { insert, read, update, remove }; 