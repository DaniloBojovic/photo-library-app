import { Injectable } from '@angular/core';
import { Photo } from '../../../core/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favorites';
  private favorites: Photo[] = [];

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const data = localStorage.getItem(this.favoritesKey);
    this.favorites = data ? JSON.parse(data) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
  }

  getFavorites(): Photo[] {
    return this.favorites;
  }

  addFavorite(photo: Photo): void {
    if (!this.isFavorite(photo.id)) {
      this.favorites.push(photo);
      this.saveFavorites();
    }
  }

  removeFavorite(photoId: number): void {
    this.favorites = this.favorites.filter((photo) => photo.id !== photoId);
    this.saveFavorites();
  }

  isFavorite(photoId: number): boolean {
    return this.favorites.some((photo) => photo.id === photoId);
  }
}
