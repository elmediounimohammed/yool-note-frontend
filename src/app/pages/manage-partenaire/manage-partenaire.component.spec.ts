import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePartenaireComponent } from './manage-partenaire.component';

describe('ManagePartnersComponent', () => {
  let component: ManagePartenaireComponent;
  let fixture: ComponentFixture<ManagePartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePartenaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
