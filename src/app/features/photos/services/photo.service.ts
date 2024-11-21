import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Photo } from '../../../core/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  //private apiUrl = environment.apiUrl;
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<any[]> {
    return this.http.get<Photo[]>(this.apiUrl).pipe(delay(300));
  }
}
