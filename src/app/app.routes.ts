import { Routes } from '@angular/router';
import { LogicaComponent } from './logica/logica.component';

export const routes: Routes = [
  { path: '', redirectTo: 'logica', pathMatch: 'full' },
  { path: 'logica', component: LogicaComponent }
];
