import UsersDao from "../dao/dbManagers/users.manager.js";

const usersDao = new UsersDao();

const getUsers = async () => {
  const result = await usersDao.getUsers();
  return result;
};

const getUserById = async (id) => {
  const result = await usersDao.getUserById(id);
  return result;
};

const createUser = async (user) => {
  const result = await usersDao.createUser(user);
  return result;
};

const deleteUser = async (id) => {
  const result = await usersDao.deleteUser(id);
  return result;
};

const getByEmail = async (email) => {
  const result = await usersDao.getUserByEmailgetUserById(email);
  return result;
};

export { getUsers, getUserById, createUser,deleteUser,getByEmail };
