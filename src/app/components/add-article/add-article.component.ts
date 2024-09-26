import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { StorageService } from '../../_services/storage.service'; // Import du service de stockage

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  article = {
    title: '',
    description: '',
    published: false,
    image: null as File | null,
  };
  submitted = false;
  previewImage: string | ArrayBuffer | null = null;
  hasAdminRole = false; // Variable pour vérifier le rôle

  constructor(
    private articleService: ArticleService,
    private storageService: StorageService // Injection du service de stockage
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur a le rôle d'administrateur
    const user = this.storageService.getUser();
    this.hasAdminRole = user.roles.includes('ROLE_ADMIN');
  }

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
        this.previewImage = null;
      },
      error: (e) => console.error(e),
    });
  }

  newArticle(): void {
    this.submitted = false;
    this.article = {
      title: '',
      description: '',
      published: false,
      image: null,
    };
    this.previewImage = null;
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.article.image = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
