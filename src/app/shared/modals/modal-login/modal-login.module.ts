import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalLoginRoutingModule } from './modal-login-routing.module';
import { ModalLoginComponent } from './modal-login.component';
import { ModalLoginService } from './modal-login.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalLoginComponent],
  imports: [
    CommonModule,
    ModalLoginRoutingModule,
    FormsModule
  ],
  providers: [ModalLoginService],
  exports: [ModalLoginComponent]
})
export class ModalLoginModule { }
