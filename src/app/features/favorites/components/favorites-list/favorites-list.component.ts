import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Photo } from '../../../../core/models/photo.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit {
  favorites: Photo[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites(); // Load favorites from service
  }

  viewPhotoDetail(photoId: number): void {
    this.router.navigate(['/photos', photoId]);
  }

  removeFromFavorites(photoId: number): void {
    this.favoritesService.removeFavorite(photoId);
    this.favorites = this.favoritesService.getFavorites(); // Refresh the list
  }
}
