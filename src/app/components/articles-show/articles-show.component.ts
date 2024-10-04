import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles-show',
  templateUrl: './articles-show.component.html',
  styleUrls: ['./articles-show.component.css']
})
export class ArticlesShowComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle?: Article;  // Stocker l'article sélectionné pour la modal
  message: string = '';
  searchTerm: string = ''; // Nouveau champ pour le terme de recherche

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  openModal(article: Article): void {
    this.selectedArticle = article;  // Enregistre l'article sélectionné
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.style.display = 'block';  // Affiche la modal
    }
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe({
      next: (data) => {
        // Parcourir les articles et ajouter le chemin complet de l'image
        this.articles = data.map(article => {
          if (article.image) {
            // Ajoutez le chemin complet du serveur
            article.image = `http://localhost:8080/uploads/${article.image}`;
          }
          return article;
        });
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur lors de la récupération des articles.';
      }
    });
  }

  // Méthode pour rechercher des articles par titre
  searchArticles(): void {
    if (this.searchTerm.trim() === '') {
      // Si le terme de recherche est vide, rechargez tous les articles
      this.loadArticles();
      return;
    }

    this.articleService.findByTitle(this.searchTerm).subscribe({
      next: (data) => {
        this.articles = data.map(article => {
          if (article.image) {
            // Ajoutez le chemin complet du serveur
            article.image = `http://localhost:8080/uploads/${article.image}`;
          }
          return article;
        });
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur lors de la recherche des articles.';
      }
    });
  }
}
