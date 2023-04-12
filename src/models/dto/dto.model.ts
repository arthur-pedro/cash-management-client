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

  goals: Goal[]
}

export interface Goal {
  name: string;

  assets: Asset[]
}

export interface Asset {
  name: string;
  
  description: string;
  
  price: number;
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
