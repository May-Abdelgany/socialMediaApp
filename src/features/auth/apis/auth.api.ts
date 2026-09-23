import { api } from "../../../shared/axios/axios";
import { hashPassword } from "../../../shared/utils/hashPassword";
import type { GeneralResponse } from "../../../shared/interfaces/generalResponse";
import type { LoginRequest } from "../interfaces/loginRequest";
import type { LoginResponseData } from "../interfaces/loginResponse";
import type { RegisterRequest } from "../interfaces/registerRequest";

export const login = async (
  payload: LoginRequest,
): Promise<GeneralResponse<LoginResponseData>> => {
  const hashedPassword = await hashPassword(payload.password);

  const response = await api.post<GeneralResponse<LoginResponseData>>("/auth/login", {
    ...payload,
    password: hashedPassword,
  });

  return response.data;
};

export const register = async (
  payload: RegisterRequest,
): Promise<GeneralResponse<LoginResponseData>> => {
  const hashedPassword = await hashPassword(payload.password);
  const hashedConfirmPassword = await hashPassword(payload.confirmPassword);

  const response = await api.post<GeneralResponse<LoginResponseData>>("/auth/signup", {
    nameAr: payload.nameAr,
    nameEn: payload.nameEn,
    email: payload.email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });

  return response.data;
};
