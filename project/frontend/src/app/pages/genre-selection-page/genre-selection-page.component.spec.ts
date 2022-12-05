import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSelectionPageComponent } from './genre-selection-page.component';

describe('GenreSelectionPageComponent', () => {
  let component: GenreSelectionPageComponent;
  let fixture: ComponentFixture<GenreSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreSelectionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
