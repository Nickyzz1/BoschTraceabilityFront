import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StationComponent } from './station/station.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // rota raiz
   { path: 'station', component: StationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
