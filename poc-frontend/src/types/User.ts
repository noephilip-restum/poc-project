export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  account_status: string;
  account_role: string;
};

export type returnError = {
  message: string;
};
