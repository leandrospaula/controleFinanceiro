import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovidadesRoutingModule } from './novidades-routing.module';
import { NovidadesComponent } from './novidades.component';
import { NovidadesService } from './novidades.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NovidadesComponent],
  imports: [
    CommonModule,
    NovidadesRoutingModule,
    FormsModule
  ],
  providers: [NovidadesService]
})
export class NovidadesModule { }
