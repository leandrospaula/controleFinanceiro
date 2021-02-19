import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesasFixasRoutingModule } from './despesas-fixas-routing.module';
import { DespesasFixasService } from './despesas-fixas.service';
import { DespesasFixasComponent } from './despesas-fixas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DespesasFixasComponent],
  imports: [
    CommonModule,
    DespesasFixasRoutingModule,
    FormsModule
  ],
  providers: [ DespesasFixasService]
})
export class DespesasFixasModule { }
