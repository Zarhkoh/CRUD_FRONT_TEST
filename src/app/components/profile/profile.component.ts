import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  emailForm!: FormGroup; // Formulaire pour changer l'email
  passwordForm!: FormGroup; // Formulaire pour changer le mot de passe
  message: string = '';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();

    // Initialisation du formulaire pour changer l'email
    this.emailForm = this.formBuilder.group({
      newEmail: ['']
    });

    // Initialisation du formulaire pour changer le mot de passe
    this.passwordForm = this.formBuilder.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  // Méthode pour changer l'email
  onChangeEmail(): void {
    const newEmail = this.emailForm.get('newEmail')?.value;

    if (newEmail) {
      this.authService.changeEmail(newEmail).subscribe({
        next: (response) => {
          this.message = 'Email changed successfully!';
          // Mise à jour du stockage local avec le nouvel email
          this.currentUser.email = newEmail;
          this.storageService.saveUser(this.currentUser);
        },
        error: (err) => {
          this.message = err.error.message || 'Failed to change email.';
        }
      });
    }
  }

  // Méthode pour changer le mot de passe
  onChangePassword(): void {
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.message = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: (response) => {
        this.message = 'Mot de passe changé avec succès!';
      },
      error: (err) => {
        this.message = err.error.message || 'Échec du changement de mot de passe.';
      }
    });
  }
}
