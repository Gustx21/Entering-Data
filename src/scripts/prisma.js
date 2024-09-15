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
  const users = await prisma.user.findMany({
    include: {
      posts: true
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
      posts: true
    }
  })

  return userId;
}

async function readPosts(id) {
  const userPosts = await prisma.post.findMany({
    where: {
      authorId: id
    }
  });

  return userPosts;
}


async function update(id, dados) {
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: dados
  });

  return updatedUser;
}

async function remove(id) {
  const deletedUser = await prisma.user.delete({
    where: { id: id }
  });


  return deletedUser;
}

export { insert, read, update, remove, readPosts, readIdUser };