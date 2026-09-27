import type { User } from "../interfaces/loginResponse";

export interface UserState {
  data: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}