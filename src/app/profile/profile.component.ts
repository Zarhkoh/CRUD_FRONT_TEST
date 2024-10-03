import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  emailForm!: FormGroup; // Utilisation du '!' pour indiquer qu'il sera défini plus tard
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
}
