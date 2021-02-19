import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoRoutingModule } from './cartao-routing.module';
import { CartaoComponent } from './cartao.component';
import { FormsModule } from '@angular/forms';
import { CartaoService } from './cartao.service';

@NgModule({
    imports: [
        CommonModule,
        CartaoRoutingModule,
        FormsModule
    ],
    declarations: [CartaoComponent],
    providers: [CartaoService]
})
export class CartaoModule { }
