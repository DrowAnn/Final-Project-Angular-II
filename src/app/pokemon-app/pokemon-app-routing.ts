import { Route } from '@angular/router';
import { PokemonAppComponent } from './pokemon-app.component';

const Routes: Route[] = [
  {
    path: '',
    component: PokemonAppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.component'),
      },
      {
        path: 'pokemon-characters',
        loadComponent: () =>
          import('./pokemon-characters/pokemon-characters.component'),
      },
    ],
  },
];

export default Routes;
