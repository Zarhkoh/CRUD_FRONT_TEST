import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'add', component: AddArticleComponent },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
