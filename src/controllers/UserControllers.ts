import { User } from "../types/userType";

const getUsers = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const editUser = (updatedUser: User): void => {
  const users = getUsers().map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  localStorage.setItem("users", JSON.stringify(users));
};

export const deleteUser = (id: number): void => {
  const users = getUsers().filter((user) => user.id !== id);
  localStorage.setItem("users", JSON.stringify(users));
};

export const searchUsers = (query: string): User[] => {
  const users = getUsers();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.address.toLowerCase().includes(query.toLowerCase()) ||
      user.bookTitle.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterUsersByDate = (
  startDate: string,
  endDate: string
): User[] => {
  const users = getUsers();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  return users.filter((user) => {
    const loadDate = new Date(user.loadDate);
    const returnDate = new Date(user.returnDate);

    const isInRange =
      (start ? loadDate >= start : true) && (end ? returnDate <= end : true);
    return isInRange;
  });
};
