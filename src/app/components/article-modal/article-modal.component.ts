import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.css']
})
export class ArticleModalComponent implements OnInit {
  @Input() article?: Article;  // Reçoit l'article depuis le parent

  constructor() { }

  ngOnInit(): void { }

  closeModal(): void {
    // Ferme la modal en modifiant le style ou via un event (si nécessaire)
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
