import { RouterModule, Routes } from '@angular/router';
import { DarjeelingComponent } from './components/darjeeling/darjeeling.component';
import { PuriComponent } from './components/puri/puri.component';
export const routes: Routes = [
  { path: 'darjeeling', component: DarjeelingComponent },
  { path: 'puri', component: PuriComponent },
  { path: '', redirectTo: 'darjeeling', pathMatch: 'full' },
];
