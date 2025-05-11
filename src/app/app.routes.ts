import { Routes } from '@angular/router';
import { LogicaComponent } from './logica/logica.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PermutacionComponent } from './permutacion/permutacion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'logica', component: LogicaComponent },
  { path: 'permutaciones', component: PermutacionComponent },
  { path: 'navbar', component: NavbarComponent}
];
