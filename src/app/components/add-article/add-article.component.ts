import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent {
  article = {
    title: '',
    description: '',
    published: false,
    image: null as File | null
  };
  submitted = false;
  previewImage: string | ArrayBuffer | null = null;  // Pour stocker l'aperçu de l'image

  constructor(private articleService: ArticleService) {}

  saveArticle(): void {
    const formData = new FormData();
    formData.append('title', this.article.title);
    formData.append('description', this.article.description);
    formData.append('published', this.article.published.toString());
    if (this.article.image) {
      formData.append('image', this.article.image);
    }

    this.articleService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.previewImage = null; // Réinitialise l'aperçu de l'image
      },
      error: (e) => console.error(e)
    });
  }

  newArticle(): void {
    this.submitted = false;
    this.article = {
      title: '',
      description: '',
      published: false,
      image: null
    };
    this.previewImage = null; // Réinitialise l'aperçu de l'image
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.article.image = file;

      // Générer l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
