import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DicasComponent } from './dicas.component';

const routes: Routes = [
  { path: '', component: DicasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DicasRoutingModule { }
