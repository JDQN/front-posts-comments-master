import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCanalesComponent } from './mis-canales.component';

describe('MisCanalesComponent', () => {
  let component: MisCanalesComponent;
  let fixture: ComponentFixture<MisCanalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCanalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCanalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
