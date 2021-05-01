import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.css']
})
export class NovidadesComponent implements OnInit {

  constructor() { }

  versao: String = '30/04/2021';

  ngOnInit(): void {
  }

}
