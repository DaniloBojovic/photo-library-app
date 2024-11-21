import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Photo } from '../../../../core/models/photo.model';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-photo-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss',
})
export class PhotoDetailComponent {
  photo?: Photo;

  constructor(
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const photoId = Number(this.route.snapshot.paramMap.get('id'));
    this.photo = this.favoritesService
      .getFavorites()
      .find((p) => p.id === photoId);
  }

  removeFromFavorites(): void {
    if (this.photo) {
      this.favoritesService.removeFavorite(this.photo.id);
      alert('Photo removed from favorites.');
      this.router.navigate(['/favorites']);
    }
  }
}
