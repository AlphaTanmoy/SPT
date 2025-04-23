import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarjeelingComponent } from './darjeeling.component';

describe('DarjeelingComponent', () => {
  let component: DarjeelingComponent;
  let fixture: ComponentFixture<DarjeelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarjeelingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarjeelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
