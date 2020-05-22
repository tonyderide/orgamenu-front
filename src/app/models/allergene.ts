import {User} from "./user";

export interface Allergene {
  id: number;
  name: string;
  user: User[];
}
