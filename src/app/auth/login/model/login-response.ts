
export interface DataLogin{
  userUid: String;
  token: string;
}

export interface LoginResponse {
  code: number;
  success: string;
  description: String;
  message: String;
  data: DataLogin;
}

