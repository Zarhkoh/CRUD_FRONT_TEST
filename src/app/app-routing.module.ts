import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'add', component: AddArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
