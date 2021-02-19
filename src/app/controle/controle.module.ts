import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControleRoutingModule } from './controle-routing.module';
import { ControleComponent } from './controle.component';
import { ControleService } from './controle.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ControleComponent],
  imports: [
    CommonModule,
    ControleRoutingModule,
    FormsModule
  ],
  providers: [ControleService]
})
export class ControleModule { }
