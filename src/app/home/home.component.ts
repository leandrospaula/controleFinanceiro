import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isScrolled: boolean = false;
  deslogado: boolean = window.localStorage.getItem('token') == null;
  loading: boolean = true;
  trys: number = 0;

  constructor(private service: HomeService, private rota: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.load().subscribe((res) => {
      this.loading = false;
    }, (e) => {
      timer(5000).subscribe(() => {
        this.trys += 1;
        if (this.trys < 3) {
          this.load();
        }
      });
    });
  }



  goto(s: string) {
    let e = document.getElementById(s);
    e.scrollIntoView();
  }

  @HostListener("window:scroll")
  scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

  irRota() {
    this.rota.navigate(['controle']);
  }

}
