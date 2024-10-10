// src/app/models/user.model.ts

export class User {
  id!: number;               // Identifiant de l'utilisateur
  username!: string;        // Nom d'utilisateur
  email!: string;           // Adresse e-mail
  roles!: string[];         // Rôles de l'utilisateur
  password?: string;        // Mot de passe (optionnel)

  constructor(id: number, username: string, email: string, roles: string[], password?: string) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.roles = roles;
      this.password = password;
  }
}
