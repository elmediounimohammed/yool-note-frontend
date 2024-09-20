import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEtudiantComponent } from './manage-etudiant.component';


describe('ManageEtudiantComponent', () => {
  let component: ManageEtudiantComponent;
  let fixture: ComponentFixture<ManageEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
