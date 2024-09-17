import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showLoginForm = true;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  // Actions d'inscription et de connexion (non fonctionnelles pour le moment)
  login() {
    console.log('Login action');
  }

  register() {
    console.log('Register action');
  }
}
