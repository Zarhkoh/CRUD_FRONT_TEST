import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    console.log('Tentative de déconnexion...');
    this.authService.logout().subscribe({
      next: res => {
        console.log('Réponse de déconnexion:', res);
        this.storageService.clean(); // Effacez les données de l'utilisateur
        window.location.reload(); // Rechargez la page pour actualiser l'interface
      },
      error: err => {
        console.error('Erreur de déconnexion:', err);
        alert('Erreur lors de la déconnexion.'); // Alerte à l'utilisateur
      }
    });
  }

  // Méthode pour retourner à la page précédente
  goBack(): void {
    window.history.back();
  }
}
