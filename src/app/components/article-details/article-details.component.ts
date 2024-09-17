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
    title: '',
    description: '',
    published: false,
    image:''
  };

  message = '';

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getArticle(this.route.snapshot.params['id']);
    }
  }

  getArticle(id: string): void {
    this.articleService.get(id).subscribe({
      next: (data) => {
        this.currentArticle = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentArticle.title,
      description: this.currentArticle.description,
      published: status
    };

    this.message = '';

    this.articleService.update(this.currentArticle.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentArticle.published = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateArticle(): void {
    this.message = '';

    this.articleService
      .update(this.currentArticle.id, this.currentArticle)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This article was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteArticle(): void {
    this.articleService.delete(this.currentArticle.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/articles']);
      },
      error: (e) => console.error(e)
    });
  }
}
