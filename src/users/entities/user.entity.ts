import { UserRole } from '../dto/create-user.dto';

export class User {
  id: number; 
  name: string; 
  email: string; 
  password: string; 
  role: UserRole; 
}
