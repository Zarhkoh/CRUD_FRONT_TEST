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
  isDarkMode = false; // État du mode nuit

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
    this.authService.logout(); // Appelle simplement le logout du service
    window.location.reload(); // Rechargez la page pour actualiser l'interface
  }

  goBack(): void {
    window.history.back();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode; // Basculer l'état du mode nuit
    console.log('Mode nuit activé:', this.isDarkMode); // Vérifiez l'état
    const body = document.body;
    body.classList.toggle('dark-mode', this.isDarkMode); // Ajouter ou retirer la classe de mode nuit
  }
}
