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
  }

  selectFile(event: any): void {
    if (event.target.files.length > 0) {
      this.article.image = event.target.files[0];
    }
  }
}
