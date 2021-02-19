import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasFixasComponent } from './despesas-fixas.component';

describe('DespesasFixasComponent', () => {
  let component: DespesasFixasComponent;
  let fixture: ComponentFixture<DespesasFixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespesasFixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesasFixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
