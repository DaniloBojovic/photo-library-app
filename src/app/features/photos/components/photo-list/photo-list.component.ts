import { Component, HostListener } from '@angular/core';
import { delay, catchError, of } from 'rxjs';
import { Photo } from '../../../../core/models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss',
})
export class PhotoListComponent {
  photos: Photo[] = [];
  isLoading = false;
  hasError = false;
  currentIndex = 0;
  loadBatchSize = 20;

  constructor(
    private photoService: PhotoService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !this.isLoading
    ) {
      this.loadPhotos();
    }
  }

  loadPhotos(): void {
    this.isLoading = true;
    this.photoService
      .getPhotos()
      .pipe(
        catchError((error) => {
          console.error('Error fetching photos:', error);
          this.isLoading = false;
          this.hasError = true;
          alert('Failed to load photos. Please try again later.');
          return of([]);
        })
      )
      .subscribe((data) => {
        const newPhotos = data.slice(
          this.currentIndex,
          this.currentIndex + this.loadBatchSize
        );
        this.photos = [...this.photos, ...newPhotos];
        this.currentIndex += this.loadBatchSize;
        this.isLoading = false;
      });
  }

  addToFavorites(photo: Photo): void {
    if (this.favoritesService.isFavorite(photo.id)) {
      alert('This photo is already in your favorites.');
    } else {
      debugger;
      this.favoritesService.addFavorite(photo);
      alert('Photo added to favorites!');
    }
  }
}
