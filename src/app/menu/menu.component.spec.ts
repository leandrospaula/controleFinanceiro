import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MenuComponent
      ],
    }).compileComponents();
  });

  it('should create the Menu', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const Menu = fixture.componentInstance;
    expect(Menu).toBeTruthy();
  });

  it(`should have as title 'controleFinanceiro'`, () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const Menu = fixture.componentInstance;
    expect(Menu.title).toEqual('controleFinanceiro');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('controleFinanceiro Menu is running!');
  });
});
