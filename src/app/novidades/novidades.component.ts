import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.css']
})
export class NovidadesComponent implements OnInit {

  constructor() { }

  versao: String = '15/06/2021';

  ngOnInit(): void {
  }

}
