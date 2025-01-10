import { Account } from "../types/accountType";

const defaultAccount: Account = {
  id: 1,
  username: "Rendy Yoshizawa",
  email: "rendyyoshizawa@gmail.com",
  password: "rendy123",
};

export const getAccount = (): Account => {
  const account = localStorage.getItem("account");
  return account ? JSON.parse(account) : defaultAccount;
};

const saveAccount = (account: Account): void => {
  localStorage.setItem("account", JSON.stringify(account));
};

export const editAccount = (updatedAccount: Partial<Account>): void => {
  const account = getAccount();
  const newAccount = { ...account, ...updatedAccount };
  saveAccount(newAccount);
};
