import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaoModule } from './cartao/cartao.module';
import { ControleModule } from './controle/controle.module';
import { DespesasFixasModule } from './despesas-fixas/despesas-fixas.module';
import { HomeModule } from './home/home.module';
import { MinhaContaModule } from './minha-conta/minha-conta.module';
import { AuthdGuard } from './shared/guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => HomeModule },
  { path: 'despesa-fixa', loadChildren: () => DespesasFixasModule, canActivate: [AuthdGuard] },
  { path: 'controle', loadChildren: () => ControleModule, canActivate: [AuthdGuard] },
  { path: 'cartoes', loadChildren: () => CartaoModule, canActivate: [AuthdGuard] },
  { path: 'minha-conta', loadChildren: () => MinhaContaModule, canActivate: [AuthdGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
