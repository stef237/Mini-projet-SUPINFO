import { Routes } from '@angular/router';
import {GenerateurComponent} from './generateur/generateur.component';
import {AllMemesComponent} from './all-memes/all-memes.component';

export const routes: Routes = [
  {path: '',component: GenerateurComponent},
  {path: 'galerie', component:AllMemesComponent},
];
