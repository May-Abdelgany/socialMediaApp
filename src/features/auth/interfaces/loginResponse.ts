export interface User {
  id: string;
  nameEn: string;
  nameAr: string;
  email: string;
  avatar: string | null;
  isEmailVerified: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseData {
  user: User;
}
