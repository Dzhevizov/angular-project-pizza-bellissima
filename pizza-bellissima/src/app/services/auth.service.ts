import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:3030';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.currentUser$.pipe(map((u) => u !== null));
  isAdmin$ = this.currentUser$.pipe(map((u) => u?.role === 'admin'));

  constructor(private http: HttpClient) {}

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.currentUser?.accessToken ?? null;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${API_URL}/users/login`, { email, password })
      .pipe(tap((user) => this.saveUser(user)));
  }

  register(body: Record<string, string>): Observable<User> {
    return this.http
      .post<User>(`${API_URL}/users/register`, body)
      .pipe(tap((user) => this.saveUser(user)));
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${API_URL}/users/logout`).pipe(
      tap(() => this.clearUser()),
      catchError(() => {
        this.clearUser();
        return of(undefined as void);
      })
    );
  }

  private loadUser(): User | null {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private clearUser(): void {
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(null);
  }
}
