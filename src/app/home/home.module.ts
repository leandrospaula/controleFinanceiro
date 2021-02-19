import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../home/home.component';
import { HomeService } from './home.service';
import { ModalLoginModule } from '../shared/modals/modal-login/modal-login.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ModalLoginModule
  ],
  providers: [HomeService]
})
export class HomeModule { }
