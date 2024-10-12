import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { StorageService } from '../../_services/storage.service';
import { catchError, of, tap } from 'rxjs'; // Importation des opérateurs nécessaires

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.css']
})
export class ArticleModalComponent implements OnInit {
  @Input() article?: Article; // Reçoit l'article depuis le parent

  comments: Comment[] = []; // Liste des commentaires
  newCommentContent: string = ''; // Contenu du nouveau commentaire
  userId: number = 0; // ID de l'utilisateur connecté
  userName: string = ''; // Nom de l'utilisateur connecté
  isAdmin: boolean = false; // Drapeau pour vérifier si l'utilisateur est admin

  constructor(
    private commentService: CommentService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getComments(); // Charge les commentaires existants
    this.getUserData(); // Charge les données de l'utilisateur connecté
  }

  openModal(article: Article): void {
    this.article = article;
    this.getComments(); // Récupère les commentaires à chaque fois que le modal est ouvert
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.style.display = 'block'; // Affiche le modal
    }
  }


  closeModal(): void {
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Charge les commentaires existants pour l'article actuel
// Charge les commentaires existants pour l'article actuel
getComments(): void {
  if (this.article?.id) {
    console.log(`Récupération des commentaires pour l'article ID: ${this.article.id}`);
    this.commentService.getComments(this.article.id).pipe(
      tap(comments => {
        this.comments = comments; // Mise à jour des commentaires dans la vue
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des commentaires', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    ).subscribe();
  }
}


  // Récupère les informations de l'utilisateur connecté
  getUserData(): void {
    const user = this.storageService.getUser();
    if (user) {
      this.userId = user.id; // Assurez-vous que l'ID utilisateur est disponible
      this.userName = user.username; // Assurez-vous que le nom d'utilisateur est également disponible
      this.isAdmin = user.role === 'admin'; // Vérifiez si l'utilisateur est admin
    } else {
      console.warn('Aucun utilisateur connecté trouvé dans le stockage');
    }
  }

  // Ajoute un nouveau commentaire à l'article
  // Ajoute un nouveau commentaire à l'article
  addComment(): void {
    if (this.newCommentContent.trim()) {
      const newComment: Comment = {
        id: 0, // Placeholder ID, will be remplacé par le backend
        userId: this.userId,
        articleId: this.article?.id || 0,
        content: this.newCommentContent,
        createdAt: new Date() // Date de création du commentaire
      };

      this.commentService.createComment(this.article?.id || 0, newComment).pipe(
        tap(comment => {
          comment.userName = this.userName; // Ajoute le nom de l'utilisateur au commentaire
          this.comments.push(comment); // Ajoute le commentaire à la liste
          this.newCommentContent = ''; // Réinitialise le champ de commentaire
        }),
        catchError(error => {
          console.error('Erreur lors de la création du commentaire', error);
          return of(null); // Retourne null en cas d'erreur
        })
      ).subscribe();
    } else {
      console.warn('Le contenu du commentaire ne peut pas être vide');
    }
  }


  // Supprime un commentaire

}
