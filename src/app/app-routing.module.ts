import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArticlesShowComponent } from './components/articles-show/articles-show.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './auth/admin.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component'; // Importer le composant 404

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesListComponent, canActivate: [AdminGuard]  },
  { path: 'articles/:id', component: ArticleDetailsComponent, canActivate: [AdminGuard]  },
  { path: 'add', component: AddArticleComponent, canActivate: [AdminGuard]  },
  { path: 'show', component: ArticlesShowComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '404', component: NotFoundComponent }, // Route 404 pour toutes les routes non trouvées
  { path: '405', component: ForbiddenComponent } // Route 405 pour toutes les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
