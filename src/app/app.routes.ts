import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
  {
    path: 'photos',
    loadComponent: () =>
      import(
        './features/photos/components/photo-list/photo-list.component'
      ).then((m) => m.PhotoListComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import(
        './features/favorites/components/favorites-list/favorites-list.component'
      ).then((m) => m.FavoritesListComponent),
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import(
        './features/photos/components/photo-detail/photo-detail.component'
      ).then((m) => m.PhotoDetailComponent),
  },
  { path: '**', redirectTo: '/photos' },
];
