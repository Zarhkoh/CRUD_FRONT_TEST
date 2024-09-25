import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router'; // Importer Router pour la navigation

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  articles?: Article[];
  currentArticle: Article = {};
  currentIndex = -1;
  title = '';

  constructor(private articleService: ArticleService, private router: Router) {} // Injecter Router

  ngOnInit(): void {
    this.retrieveArticles();
  }

  retrieveArticles(): void {
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveArticles();
    this.currentArticle = {};
    this.currentIndex = -1;
  }

  setActiveArticle(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
  }

  // Nouvelle méthode pour supprimer l'article sélectionné
  removeArticle(id: number): void {
    this.articleService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList(); // Rafraîchir la liste après suppression
      },
      error: (e) => console.error(e)
    });
  }

  removeAllArticles(): void {
    this.articleService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentArticle = {};
    this.currentIndex = -1;

    this.articleService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.articles = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  // Nouvelle méthode pour naviguer vers la page de détails de l'article
// Dans ArticlesListComponent
editArticle(article: Article): void {
  this.router.navigate(['/articles', article.id], { queryParams: { edit: true } });
}
}
