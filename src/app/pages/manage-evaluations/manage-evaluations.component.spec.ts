import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEvaluationsComponent } from './manage-evaluations.component';

describe('ManageEvaluationsComponent', () => {
  let component: ManageEvaluationsComponent;
  let fixture: ComponentFixture<ManageEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEvaluationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
