import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticlesShowComponent } from './articles-show/articles-show.component';
import { AuthGuard } from './guards/auth.guard'; // Importer AuthGuard

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesListComponent, canActivate: [AuthGuard] }, // Protégé
  { path: 'articles/:id', component: ArticleDetailsComponent, canActivate: [AuthGuard] }, // Protégé
  { path: 'add', component: AddArticleComponent, canActivate: [AuthGuard] }, // Protégé
  { path: 'show', component: ArticlesShowComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
