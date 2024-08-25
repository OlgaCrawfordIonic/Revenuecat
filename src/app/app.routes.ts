import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'comparesounds',
    loadComponent: () => import('./pages/comparesounds/comparesounds.page').then( m => m.ComparesoundsPage)
  },
  {
    path: 'comparesounds/:linkId',
    loadComponent: () => import('./pages/comparesounds/comparesounds.page').then( m => m.ComparesoundsPage)
  },
  {
    path: 'lessons',
    loadComponent: () => import('./pages/lessons/lessons.page').then( m => m.LessonsPage)
  },
  {
    path: 'tonguetwisters',
    loadComponent: () => import('./pages/tonguetwisters/tonguetwisters.page').then( m => m.TonguetwistersPage)
  },
  {
    path: 'tonguetwisters/:linkId',
    loadComponent: () => import('./pages/tonguetwisters/tonguetwisters.page').then( m => m.TonguetwistersPage)
  },
  {
    path: 'vowels',
    loadComponent: () => import('./pages/vowels/vowels.page').then( m => m.VowelsPage)
  },
  {
    path: 'vowels/:linkId',
    loadComponent: () => import('./pages/vowels/vowels.page').then( m => m.VowelsPage)
  },
  {
    path: 'revenuecat',
    loadComponent: () => import('./revenuecat/revenuecat.page').then( m => m.RevenuecatPage)
  },
  {
    path: 'network',
    loadComponent: () => import('./pages/network/network.page').then( m => m.NetworkPage)
  },
];
