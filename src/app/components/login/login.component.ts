import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router'; // Import du Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username?: string;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router // Injection du Router
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.username = this.storageService.getUser().username; // Assigne le nom d'utilisateur
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.username = this.storageService.getUser().username; // Assigne le nom d'utilisateur

        // Redirection après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/show']).then(() => {
            window.location.reload(); // Rafraîchissement de la page
          });
        }, 2000);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
