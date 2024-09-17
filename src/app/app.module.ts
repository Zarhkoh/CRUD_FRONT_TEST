import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

// Make sure the file path is correct and the file exists in the specified location

// Make sure the file path is correct and the file exists in the specified location
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddArticleComponent,
    ArticleDetailsComponent,
    ArticlesListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
