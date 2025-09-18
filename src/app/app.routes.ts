import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/principalMenu/principalMenu.component').then(m => m.principalMenu),
  },
  {
    path: 'waiting-room',
    loadComponent: () => import('../pages/waiting-room/waiting-room.page').then( m => m.WaitingRoomPage)
  },
];
