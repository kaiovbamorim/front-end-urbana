import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCartaoComponent } from './cadastrar-cartao.component';

describe('CadastrarCartaoComponent', () => {
  let component: CadastrarCartaoComponent;
  let fixture: ComponentFixture<CadastrarCartaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarCartaoComponent]
    });
    fixture = TestBed.createComponent(CadastrarCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
