export interface UserDTO {
  username?: string;

  password?: string;

  email: string;

  fullName: string;

  bestName: string;

  status: string;

  type: string;

  client: ClientDTO;
}

export interface ClientDTO {
  id: string;

  userId: string;

  cashFlow: CashFlowDTO[]

  cash: CashDTO
}

export interface CashDTO {
  id: string;

  clientId: string;

  value: number;
}

export interface CashFlowDTO {
  value: number;

  operation: string;

  clientId: string;
}

export interface AuthDTO {
  username?: string;

  pass?: string;
}

export interface TokenDTO {
  access_token: string
}
