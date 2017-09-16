import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoDrilComponent } from './atendimento-dril.component';

describe('AtendimentoDrilComponent', () => {
  let component: AtendimentoDrilComponent;
  let fixture: ComponentFixture<AtendimentoDrilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoDrilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoDrilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
