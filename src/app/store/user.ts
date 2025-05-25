import { atom } from "jotai";

export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
}

export const initialUser = {
  id: "",
  username: "",
  email: "",
  image: "",
};

const user = atom(initialUser);

export const userAtom = atom(
  (get) => get(user),
  (get, set, update: User) => {
    return set(user, {
      ...get(user),
      ...update,
    });
  },
);
