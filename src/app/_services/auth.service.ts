import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service'; // N'oubliez pas d'importer StorageService

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Méthode pour récupérer les en-têtes avec le token JWT
  private createHttpHeaders(): HttpHeaders {
    const token = this.storageService.getToken(); // Utilise getToken depuis StorageService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token || '', // Ajoute le token s'il existe
    });
  }

  changeEmail(newEmail: string): Observable<any> {
    const token = this.storageService.getUser().accessToken; // assurez-vous que cette méthode renvoie le bon token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.http.put(AUTH_API + 'change-email', {
      email: newEmail
    }, { headers });
  }
}
