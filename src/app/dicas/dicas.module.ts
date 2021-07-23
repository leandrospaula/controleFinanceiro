import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DicasRoutingModule } from './dicas-routing.module';
import { DicasComponent } from './dicas.component';
import { DicasService } from './dicas.service';


@NgModule({
  declarations: [DicasComponent],
  imports: [
    CommonModule,
    DicasRoutingModule
  ],
  providers: [DicasService]
})
export class DicasModule { }
