export interface GeneralResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
  lang: string;
  timestamp: string;
  path: string;
}
