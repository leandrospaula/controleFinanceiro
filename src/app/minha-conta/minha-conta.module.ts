import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhaContaRoutingModule } from './minha-conta-routing.module';
import { FormsModule } from '@angular/forms';
import { MinhaContaComponent } from './minha-conta.component';
import { MinhaContaService } from './minha-conta.service';

@NgModule({
  imports: [
    CommonModule,
    MinhaContaRoutingModule,
    FormsModule,
  ],
  declarations: [MinhaContaComponent],
  providers: [MinhaContaService]
})
export class MinhaContaModule { }
