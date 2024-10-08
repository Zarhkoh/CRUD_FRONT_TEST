import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.sendResetPasswordEmail(this.email)
      .subscribe({
        next: (response: any) => {
          this.message = 'Un lien de réinitialisation a été envoyé à votre email.';
        },
        error: (error) => {
          this.message = 'Erreur lors de l\'envoi du lien de réinitialisation.';
          console.error(error);
        }
      });
  }
}
