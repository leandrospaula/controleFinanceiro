import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    MenuComponent
  ],
  providers: []
})
export class MenuModule { }
