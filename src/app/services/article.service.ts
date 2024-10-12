import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

const baseUrl = 'https://crud-back-test.vercel.app/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl);
  }

  get(id: any): Observable<Article> {
    return this.http.get<Article>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Article[]> {
    return this.http.get<Article[]>(`${baseUrl}?title=${title}`);
  }

  // File upload method using HttpRequest and HttpClient
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Create an HttpRequest for file upload
    const req = new HttpRequest('POST', `${baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  // Method to get all uploaded files
  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/files`);
  }

  getComments(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}/${articleId}/comments`);
  }

  // Créer un nouveau commentaire
  createComment(articleId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${baseUrl}/${articleId}/comments`, comment);
  }
}
