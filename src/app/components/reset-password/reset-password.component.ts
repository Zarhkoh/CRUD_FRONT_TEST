import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  userId: string | null = null;
  resetToken: string | null = null;
  passwordForm!: FormGroup;
  passwordMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la requête (id et token)
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.resetToken = params['token'];
      if (!this.userId || !this.resetToken) {
        this.passwordMessage = "Lien de réinitialisation invalide.";
        return;
      }
    });

    // Initialisation du formulaire
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  resetPassword(): void {
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.passwordMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.authService.resetPassword(this.userId, this.resetToken, newPassword).subscribe({
      next: (response) => {
        this.passwordMessage = 'Mot de passe changé avec succès!';
      },
      error: (err) => {
        this.passwordMessage = err.error.message || 'Échec du changement de mot de passe.';
      }
    });
  }
}
