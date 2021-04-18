import { v4 } from "uuid";

export type Id = string;
export function id(): Id {
  return v4();
}

export type Table<T> = {
  ids: Id[];
  byId: {
    [id: string /* Id */]: T;
  };
};
