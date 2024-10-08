export interface loginUserProps {
  email: string;
  password: string;
}
export interface adminProps {
  email: string;
  token: string;
  name: string;
  phone: string;
  role:role;
}
export interface AgentDataType {
  id: string;
  name: string;
  email: string;
  phone: string;
  pincode: string;
  role: string;
  password?: string; // Optional field
}

export interface BooksUserType {
  name: string;
  email: string;
  phone: string;
  pincode: string;
  address:string;
  role: role;
}
export interface BooksUserTypeWithId extends BooksUserType {
  id:string;
}
export interface createUserProps {
  email: string;
  name: string;
  phone: string;
  role:role;
  password:string;
  pincode?:string;
}

export type role = 'Super Admin' | 'CRM Agent' | 'Agent'|'Books User';
