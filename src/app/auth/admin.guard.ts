import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService); // Injecter le service de stockage
  const router = inject(Router); // Injecter le routeur

  const user = storageService.getUser(); // Récupérer les informations de l'utilisateur
  const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN'); // Vérifier si l'utilisateur est admin

  if (!isAdmin) {
    router.navigate(['/405']); // Redirigez vers une page d'accueil ou d'erreur
    return false; // Interdire l'accès à la route
  }

  return true; // Autoriser l'accès à la route
};
