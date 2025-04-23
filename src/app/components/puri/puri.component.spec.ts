import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuriComponent } from './puri.component';

describe('PuriComponent', () => {
  let component: PuriComponent;
  let fixture: ComponentFixture<PuriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
