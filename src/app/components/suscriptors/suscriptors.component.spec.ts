import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptorsComponent } from './suscriptors.component';

describe('SuscriptorsComponent', () => {
  let component: SuscriptorsComponent;
  let fixture: ComponentFixture<SuscriptorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscriptorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscriptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
