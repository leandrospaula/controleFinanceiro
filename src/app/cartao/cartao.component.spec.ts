import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartaoComponent } from './cartao.component';

describe('CartaoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CartaoComponent
      ],
    }).compileComponents();
  });

  it('should create the Cartao', () => {
    const fixture = TestBed.createComponent(CartaoComponent);
    const Cartao = fixture.componentInstance;
    expect(Cartao).toBeTruthy();
  });

  it(`should have as title 'controleFinanceiro'`, () => {
    const fixture = TestBed.createComponent(CartaoComponent);
    const Cartao = fixture.componentInstance;
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CartaoComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('controleFinanceiro Cartao is running!');
  });
});
