
export interface DataLogin{
  userUid: String;
  token: String;
}

export interface LoginResponse {
  code: number;
  success: string;
  description: String;
  message: String;
  data: DataLogin;
}

