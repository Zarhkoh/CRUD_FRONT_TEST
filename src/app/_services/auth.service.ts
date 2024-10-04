import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      { username, email, password },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  // Modification de logout pour nettoyer le sessionStorage
  logout(): void {
    this.storageService.clean(); // Effacez les données de l'utilisateur
  }

  private createHttpHeaders(): HttpHeaders {
    const token = this.storageService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token || '',
    });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = this.storageService.getUser().accessToken;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    return this.http.put(AUTH_API + 'change-password', { currentPassword, newPassword }, { headers });
  }

  changeEmail(newEmail: string): Observable<any> {
    const token = this.storageService.getUser().accessToken;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    return this.http.put(AUTH_API + 'change-email', { email: newEmail }, { headers });
  }
}
