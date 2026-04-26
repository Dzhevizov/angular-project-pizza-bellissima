import { Injectable } from '@angular/core';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Replace these method bodies with your actual API calls.

  async login(email: string, password: string): Promise<void> {
    // Example: await this.http.post('/api/auth/login', { email, password }).toPromise();
    throw new Error('login() not implemented');
  }

  async register(username: string, password: string, profile: UserProfile): Promise<void> {
    // Example: await this.http.post('/api/auth/register', { username, password, ...profile }).toPromise();
    throw new Error('register() not implemented');
  }
}
