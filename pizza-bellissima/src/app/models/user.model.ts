export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  phone?: string;
  notes?: string;
  role: 'client' | 'admin';
  accessToken: string;
}
