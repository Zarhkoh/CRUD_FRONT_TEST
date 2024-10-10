import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.retrieveUsers(); // Récupérer les utilisateurs à l'initialisation
  }

  retrieveUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error(error);
        alert("Erreur lors de la récupération des utilisateurs.");
      }
    );
  }

  deleteUser(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== id);
          alert("Utilisateur supprimé avec succès !");
        },
        (error) => {
          console.error(error);
          alert("Une erreur est survenue lors de la suppression de l'utilisateur.");
        }
      );
    }
  }
}
