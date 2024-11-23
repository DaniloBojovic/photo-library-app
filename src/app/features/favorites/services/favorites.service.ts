import { effect, Injectable, signal } from '@angular/core';
import { Photo } from '../../../core/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favorites';
  //private favorites: Photo[] = [];
  private favorites = signal<Photo[]>(this.loadFavorites());

  constructor() {
    //this.loadFavorites();
    effect(() => {
      this.saveFavorites(this.favorites());
    });
  }

  // private loadFavorites(): void {
  //   const data = localStorage.getItem(this.favoritesKey);
  //   this.favorites = data ? JSON.parse(data) : [];
  // }

  private loadFavorites(): Photo[] {
    const storedFavorites = localStorage.getItem(this.favoritesKey);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  // private saveFavorites(): void {
  //   localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
  // }

  private saveFavorites(favorites: Photo[]): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  getFavorites(): Photo[] {
    //return this.favorites;
    return this.favorites();
  }

  addFavorite(photo: Photo): void {
    // if (!this.isFavorite(photo.id)) {
    //   this.favorites.push(photo);
    //   this.saveFavorites();
    // }
    debugger;
    if (!this.isFavorite(photo.id)) {
      this.favorites.update((currentFavorites) => [...currentFavorites, photo]);
    }
  }

  removeFavorite(photoId: number): void {
    // this.favorites = this.favorites.filter((photo) => photo.id !== photoId);
    // this.saveFavorites();
    this.favorites.update((currentFavorites) =>
      currentFavorites.filter((photo) => photo.id !== photoId)
    );
  }

  isFavorite(photoId: number): boolean {
    //return this.favorites.some((photo) => photo.id === photoId);
    return this.favorites().some((photo) => photo.id === photoId);
  }
}
