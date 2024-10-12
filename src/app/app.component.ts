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

      // Ajoutez des vérifications pour user et user.roles
      if (user) {
        this.roles = user.roles || []; // Utiliser un tableau vide par défaut
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.username = user.username;
      } else {
        console.error("L'utilisateur est undefined ou n'a pas de rôles.");
      }
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    console.log('Tentative de déconnexion...');
    this.authService.logout(); // Appelle simplement le logout du service
    window.location.reload(); // Rechargez la page pour actualiser l'interface
  }

  goBack(): void {
    window.history.back();
  }
}
