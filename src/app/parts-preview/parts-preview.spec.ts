import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsPreview } from './parts-preview';

describe('PartsPreview', () => {
  let component: PartsPreview;
  let fixture: ComponentFixture<PartsPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartsPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(PartsPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
