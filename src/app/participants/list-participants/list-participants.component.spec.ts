import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticipantsComponent } from './list-participants.component';

describe('ListParticipantsComponent', () => {
  let component: ListParticipantsComponent;
  let fixture: ComponentFixture<ListParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
