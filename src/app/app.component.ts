import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'controleFinanceiro';

  menu() : boolean{
    return !window.location.href.toString().includes('home')
  }
}
