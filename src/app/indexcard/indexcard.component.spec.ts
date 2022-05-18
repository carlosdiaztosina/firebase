import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexcardComponent } from './indexcard.component';

describe('IndexcardComponent', () => {
  let component: IndexcardComponent;
  let fixture: ComponentFixture<IndexcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
