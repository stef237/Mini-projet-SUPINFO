import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Meme} from '../model/Meme';

@Injectable({
  providedIn: 'root',
})
export class MemeService {
  private baseUrl = 'http://localhost:8080/api/memes';

  constructor(private http: HttpClient) { }

  getMemes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/read`);
  }

  createMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>(`${this.baseUrl}/creer`, meme);
  }
}
