import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth.model'; // Import Auth interface

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private apiServerUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  // Login method
  public login(email: string, password: string): Observable<any> {
    const body: Auth = { email, password }; // Use Auth interface
    return this.http.post<any>(`${this.apiServerUrl}/auth/authenticate`, body);
  }

  public checkToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiServerUrl}/demo-controller`, { headers, responseType: 'text' as 'json' });
  }



}
