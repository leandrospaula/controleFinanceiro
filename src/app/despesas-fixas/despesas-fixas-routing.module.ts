import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DespesasFixasComponent } from './despesas-fixas.component';

const routes: Routes = [
  { path: '', component: DespesasFixasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasFixasRoutingModule { }
