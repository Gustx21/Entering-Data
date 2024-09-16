import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function insertUser(name, email) {
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email
    }
  });

  return newUser;
}

async function readUser() {
  const users = await prisma.user.findMany({
    include: {
      address: true
    }
  });

  return users;
}

async function readIdUser(id) {
  const userId = await prisma.user.findMany({
    where: {
      id: id
    },
    include: {
      address: true
    }
  })

  return userId;
}

async function readAddress(CEP) {
  const userAddress = await prisma.address.findMany({
    where: {
      CEP: CEP
    }
  });

  return userAddress;
}


async function updateUser(id, dados) {
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: dados
  });

  return updatedUser;
}

async function removeUser(id) {
  const deletedUser = await prisma.user.delete({
    where: { id: id }
  });


  return deletedUser;
}

export { insertUser, readUser, updateUser, removeUser, readAddress, readIdUser };