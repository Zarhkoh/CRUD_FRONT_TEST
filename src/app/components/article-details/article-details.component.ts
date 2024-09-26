import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentArticle: Article = {
    id: null,
    title: '',
    description: '',
    published: false,
    image: '',
  };

  message = '';
  editMode: boolean = false; // Variable pour le mode d'édition
  selectedFile: File | null = null; // Pour stocker le fichier sélectionné

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getArticle(this.route.snapshot.params['id']);

      // Vérifiez si le mode d'édition est activé
      this.route.queryParams.subscribe(params => {
        this.editMode = params['edit'] === 'true';
      });
    }
  }

  getArticle(id: string): void {
    this.articleService.get(id).subscribe({
      next: (data) => {
        this.currentArticle = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  editArticle(): void {
    this.router.navigate(['/articles', this.currentArticle.id], { queryParams: { edit: true } });
  }

  deleteArticle(): void {
    this.articleService.delete(this.currentArticle.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/articles']);
      },
      error: (e) => console.error(e),
    });
  }

  updateArticle(): void {
    // Vérifiez que tous les champs nécessaires sont remplis
    if (!this.currentArticle.title || !this.currentArticle.description) {
      alert("Le titre et la description sont obligatoires !");
      return; // Ne pas procéder si les champs obligatoires ne sont pas remplis
    }

    const formData = new FormData();

    formData.append('title', this.currentArticle.title);
    formData.append('description', this.currentArticle.description);
    formData.append('published', this.currentArticle.published ? 'true' : 'false');

    // Ajouter le fichier s'il existe
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    // Envoi de la requête de mise à jour
    this.articleService.update(this.currentArticle.id, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.message = "L'article a été mis à jour avec succès.";
        this.router.navigate(['/articles']); // Naviguer vers la liste des articles après mise à jour
      },
      error: (e) => {
        console.error(e);
        this.message = "Erreur lors de la mise à jour de l'article.";
      }
    });
  }




  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0]; // Enregistre le fichier sélectionné
    }
  }
}
