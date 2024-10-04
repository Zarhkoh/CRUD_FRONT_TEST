import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  emailForm!: FormGroup; // Formulaire pour changer l'email
  passwordForm!: FormGroup; // Formulaire pour changer le mot de passe
  emailMessage: string = ''; // Message pour l'email
  passwordMessage: string = ''; // Message pour le mot de passe

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();

    // Initialisation du formulaire pour changer l'email
    this.emailForm = this.formBuilder.group({
      currentEmail: [this.currentUser.email, [Validators.required, Validators.email]], // Email actuel pré-rempli
      newEmail: ['', [Validators.required, Validators.email]] // Nouveau email requis
    });

    // Initialisation du formulaire pour changer le mot de passe
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

// Méthode pour changer l'email
onChangeEmail(): void {
  const currentEmail = this.emailForm.get('currentEmail')?.value;
  const newEmail = this.emailForm.get('newEmail')?.value;

  // Vérification si l'email actuel est correct
  if (currentEmail !== this.currentUser.email) {
    this.emailMessage = 'L\'adresse email actuelle est incorrecte.'; // Message d'erreur
    return;
  }

  // Vérification si le nouvel email contient un caractère '@'
  if (!newEmail.includes('@')) {
    this.emailMessage = 'L\'adresse email doit contenir un caractère "@".'; // Message d'erreur
    return;
  }

  // Si tout est correct, procéder au changement d'email
  this.authService.changeEmail(newEmail).subscribe({
    next: (response) => {
      this.emailMessage = 'Email changé avec succès!'; // Message de succès
      // Mise à jour du stockage local avec le nouvel email
      this.currentUser.email = newEmail;
      this.storageService.saveUser(this.currentUser);
    },
    error: (err) => {
      this.emailMessage = err.error.message || 'Échec du changement de mail'; // Message d'erreur pour l'email
    }
  });
}


  // Méthode pour changer le mot de passe
  onChangePassword(): void {
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.passwordMessage = "Les mots de passe ne correspondent pas."; // Message d'erreur pour le mot de passe
      return;
    }

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: (response) => {
        this.passwordMessage = 'Mot de passe changé avec succès!'; // Message de succès pour le mot de passe
      },
      error: (err) => {
        this.passwordMessage = err.error.message || 'Échec du changement de mot de passe.'; // Message d'erreur pour le mot de passe
      }
    });
  }
}
