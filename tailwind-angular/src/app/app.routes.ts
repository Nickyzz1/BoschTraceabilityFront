import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StationComponent } from './station/station.component';
import { MovimentComponent } from './moviment/moviment.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // rota raiz
  { path: 'management', component: StationComponent },
  { path: 'moviment', component: MovimentComponent },
  { path: 'history', component: HistoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
